/// <reference types="@sveltejs/kit" />

declare global {
  namespace App {
    interface Locals {
      lang: string;
    }
    interface PageData {
      lang: string;
    }
    // interface Error {}
    // interface Platform {}
  }
}