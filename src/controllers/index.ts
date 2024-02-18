export type getResponse = {
  body: string;
};

export function get(): getResponse {
  return {
    body: "Hello World",
  };
}
