import * as fs from "node:fs";

export async function runController(Astro, next) {
  console.log(Astro);

  let path = Astro.url.pathname;
  console.log(path);

  // if path is / then set to /index
  if (path === "/") {
    path = "/index";
  }

  // check file exists
  const stat = fs.lstatSync(`./src/controllers${path}.ts`);

  const controllerExists = stat.isFile();

  if (controllerExists) {
    const realpath = fs.realpathSync(`./src/controllers${path}.ts`);
    // import controller
    const controller = await import(realpath);

    // request method
    let method = Astro.request.method.toLowerCase();

    // check if method exists
    if (controller[method]) {
      // call method
      Astro.locals = await controller[method](Astro);
    } else {
      // 405
      throw new Error("405: Method Not Allowed. Method does not exist.");
    }
  } else {
    // 404
    throw new Error("404: Not Found. Controller does not exist.");
  }

  next();
}
