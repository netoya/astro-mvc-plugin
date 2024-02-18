import { sequence } from "astro:middleware";
import { runController } from "../..";

export const onRequest = sequence(runController);
