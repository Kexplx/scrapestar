import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit() {
    this.title.setTitle('404 / Scrapestar');

    // Help google indexer to skip this error page.
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex',
    });
  }
}
