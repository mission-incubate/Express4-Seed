declare module 'http' {
  function http(path: string): string;
  module http { }
  export = http;
}