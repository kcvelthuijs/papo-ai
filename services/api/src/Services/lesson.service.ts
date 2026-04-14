import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";
import path from "path";
import { parse } from "yaml";

import {
  type LessonResponse,
  type LessonSummary,
} from "@workspace/dtotypes/src/Interfaces/lesson";

const lessonPath = "data/lessons";

export const lessonService = {
  async getAll(): Promise<LessonSummary[]> {
    const LessonPath = path.join(__dirname, "..", lessonPath);
    const content = await readdir(LessonPath, { withFileTypes: true });
    const yamlFiles = content
      .filter((f) => f.isFile())
      .map((f) => f.name)
      .filter((name) => {
        const ext = path.extname(name).toLowerCase();
        return ext === ".yaml" || ext === ".yml";
      });

    const allLessons = await Promise.all(
      yamlFiles.map((file) => this.getSummary(file)),
    );
    return allLessons;
  },

  async getSummary(filename: string): Promise<LessonSummary> {
    try {
      const LessonFile = path.join(__dirname, "..", lessonPath, filename);
      if (existsSync(LessonFile)) {
        const fileContent = await readFile(LessonFile, "utf8");
        const lessonData = parse(fileContent) as LessonResponse;

        return {
          id: filename.substring(6, filename.length - 5),
          title: lessonData.title,
          description: lessonData.description,
          type: lessonData.type,
          level: lessonData.level,
          image: lessonData.image ?? "",
        };
      } else {
        throw new Error(`File "${filename}" not found.`);
      }
    } catch (e) {
      throw new Error(`Error reading file "${filename}"`);
    }
  },

  async getByID(id: string): Promise<LessonResponse> {
    const filename = `lesson${id}.yaml`;
    const LessonFileName = path.join(__dirname, "..", lessonPath, filename);
    try {
      if (existsSync(LessonFileName)) {
        const fileContent = await readFile(LessonFileName, "utf8");
        const lessonData = parse(fileContent) as LessonResponse;

        return {
          id,
          title: lessonData.title,
          description: lessonData.description,
          type: lessonData.type,
          level: lessonData.level,
          prompt: lessonData.prompt,
          voice: lessonData.voice ?? "",
          avatar: lessonData.avatar ?? undefined,
          speech: lessonData.speech ?? "",
          phrases: lessonData.phrases ?? undefined,
          image: lessonData.image ?? undefined,
        };
      } else {
        throw new Error(`File "${LessonFileName}" not found.`);
      }
    } catch (e) {
      throw new Error(`Error while reading file "${LessonFileName}"`);
    }
  },
};
