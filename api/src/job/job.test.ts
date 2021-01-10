import { Job } from './job';
import express from 'express';
import { join } from 'path';
import { tmpdir } from 'os';
import { nanoid } from 'nanoid';
import { writeFileSync } from 'fs';

// A regular html document that consists
// of basic elements, comments and embedded
// js that adds elements to the DOM after page load.
const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Header 
    <!-- test -->
    content</h1>
    <div>
      <button class="someClass">Button content</button>
    </div>
    <p name="para">Paragraph content</p>
    <span id="mySpan">Span content</span>

    <script>
        document.write("<a href='test'>Link content</a>");
    </script>
  </body>
</html>
`;

describe('#execute', () => {
  it('should scrape the page and save the results in executionResult', async () => {
    const server = serveHtml(html);

    const job = new Job({
      name: '',
      executionTimes: [],
      selectors: [
        { cssSelector: 'h1', name: 'data-a' },
        { cssSelector: 'div .someClass', name: 'data-b' },
        { cssSelector: '[name="para"]', name: 'data-c' },
        { cssSelector: '#mySpan', name: 'data-d' },
        { cssSelector: '[href="test"]', name: 'data-e' },
      ],
      url: 'http://localhost:3005', // Has to match the url in #serveHtml.
    });

    await job.execute();

    expect(job.dto.executionResult).toMatchObject({
      'data-a': 'Header content',
      'data-b': 'Button content',
      'data-c': 'Paragraph content',
      'data-d': 'Span content',
      'data-e': 'Link content',
    });

    server.close();
  });

  it('should not throw an error if the url is invalid', async () => {
    const job = new Job({
      name: 'test',
      selectors: [{ cssSelector: 'h1', name: 'text' }],
      executionTimes: [],
      url: 'invalid url 😊',
    });

    await job.execute();

    expect(async () => await job.execute()).not.toThrowError();
    expect(job.dto.executionResult).toBe(undefined);
  });
});

/**
 * Starts an express server and serves
 * the html from the given port.
 *
 * @param port The port to serve on, default is 3005
 * @returns The server instance.
 */
function serveHtml(html: string, port = 3005) {
  const path = join(tmpdir(), nanoid() + '.html'); // The extension is necessary.
  writeFileSync(path, html);

  const app = express();
  app.get('/', (_, res) => res.sendFile(path));

  const server = app.listen(port);
  return server;
}
