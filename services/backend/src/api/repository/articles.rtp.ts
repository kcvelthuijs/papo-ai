import Parser from 'rss-parser';
import type { ArticleResponse } from '../services/article.service';

const usedArticles = new Set<string>();

// RTP: https://www.rtp.pt/noticias/rss/[mundo, pais, desporto, ...]

// Maak parser aan en definieer extra namespaces voor media:content en dc:creator
const parser = new Parser({
   customFields: {
      item: [
         ['media:content', 'mediaContent', { keepArray: true }],
         ['dc:creator', 'creator'],
         ['category', 'categories', { keepArray: true }],
      ],
   },
});

interface ArticleText {
   title: string;
   description: string;
   text: string;
}

interface Article {
   title: string;
   link: string;
   pubDate: Date;
   description: string;
   categories: string[];
   httpText: string;
}

// Functie om RSS-feed op te halen en te parsen
async function fetchArticlesFromRSS(cat: string): Promise<Article[]> {
   const url = `https://www.rtp.pt/noticias/rss/${cat.toLowerCase()}`;
   const feed = await parser.parseURL(url);
   // console.log(feed);
   return feed.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: new Date(item.isoDate),
      description: item.contentSnippet,
      categories: item.categories ?? '',
      httpText: item.content,
   }));
}

// Filter alleen artikelen van de laatste 48 uur
function filterRecentArticles(articles: Article[]): Article[] {
   const now = Date.now();
   const day = 48 * 60 * 60 * 1000;

   return articles.filter((a) => now - a.pubDate.getTime() < day);
}

// Verwijder reeds gebruikte artikelen (op basis van link)
function pickRandomArticle(
   articles: Article[],
   used: Set<string>
): Article | undefined {
   const available = articles.filter((a) => !used.has(a.link));
   if (available.length === 0) {
      used.clear();
      console.log('restart');
      return pickRandomArticle(articles, used);
   } else {
      const random = available[Math.floor(Math.random() * available.length)];
      if (random && random.link) used.add(random.link);
      return random;
   }
}

async function extractImageUrl(httpMedia: string): Promise<string> {
   // get image
   const cheerio = require('cheerio');
   const $ = cheerio.load(httpMedia);

   let imageUrl = $('img').attr('src');
   if (imageUrl) {
      imageUrl = imageUrl.split('?')[0];
      if (imageUrl.includes('default-rtpnoticias.png')) imageUrl == undefined;
   }
   return imageUrl;
}

async function extractArticleText(url: string): Promise<ArticleText> {
   const response = await fetch(url);
   const html = await response.text();

   const cheerio = require('cheerio');
   const $ = await cheerio.load(html);

   const title = $('h2[itemprop="headline"]').text().trim();
   const description = $(
      'p[itemprop="description"], div[itemprop="description"]'
   )
      .text()
      .trim();

   let text = '';
   const body = $('div[itemprop="text"], p[itemprop="text"]');
   if (body.length) {
      const paragraphs: string[] = [];

      body.each((_: any, el: any) => {
         const $el = $(el);

         // Voeg alle <p> kinderen toe
         $el.find('p').each((_: any, p: any) => {
            const paragraph = $(p).text().trim();
            if (paragraph.length > 20) paragraphs.push(paragraph);
         });

         // Voeg directe tekst toe (zonder p/div tags)
         const directText = $el
            .clone() // clone om nested tekst te verwijderen
            .children()
            .remove()
            .end()
            .text()
            .trim();
         if (directText.length > 20) paragraphs.unshift(directText);
      });
      text = paragraphs.join('\n\n');
   }
   console.log('ExtractArticleText');
   console.log('url', url);
   console.log('title:', title);
   console.log('head', description);
   console.log('text', text);
   console.log();
   return { title, description, text };
}

export const RTP = {
   async getArticleByCategory(cat: string): Promise<ArticleResponse> {
      const allArticles = await fetchArticlesFromRSS(cat);
      const recentArticles = filterRecentArticles(allArticles);

      let article;
      let title = '';
      let description = '';
      let text = '';
      let imageUrl: string = '';
      let attempts = 0;

      while (text.split(/\s+/).length < 20 && attempts < 20) {
         attempts++;
         article = pickRandomArticle(recentArticles, usedArticles);
         if (article) {
            imageUrl = await extractImageUrl(article.httpText ?? '');
            const articleText = await extractArticleText(article.link ?? '');
            title = articleText.title;
            description = articleText.description;
            text = articleText.text;
         }
         console.log(
            `Attempt #${attempts}: (${text.split(/\s+/).length} woorden)...`
         );
         console.log();
      }

      return {
         title: article?.title ?? title,
         description: article?.description ?? description,
         text: text ?? '',
         link: article?.link ?? '',
         pubDate: article?.pubDate ?? new Date(),
         creator: undefined,
         categories: article?.categories ?? [],
         imageUrl: imageUrl ?? '',
      };
   },
};
