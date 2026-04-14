import { Observador } from "../Repositories/articles.observador";
import { RTP } from "../Repositories/articles.rtp";
import { type Article } from "@workspace/dtotypes/src/Interfaces/Article";

// Correio de Manha: https://www.cmjornal.pt/rss
// Público: https://feeds.feedburner.com/PublicoRSS
// RTP: https://www.rtp.pt/noticias/rss/mundo
// Observador: https://www.observador.pt/rss/ultimas
export const articleService = {
  async getArticleByCategory(cat: string): Promise<Article> {
    const article = await RTP.getArticleByCategory(cat);

    return {
      title: article?.title ?? "",
      description: article?.description ?? "",
      link: article?.link ?? "",
      text: article?.text ?? "",
      creator: article?.creator ?? "",
      pubDate: article?.pubDate ?? new Date(),
      categories: article?.categories ?? [],
      imageUrl: article.imageUrl ?? "",
    };
  },
};
