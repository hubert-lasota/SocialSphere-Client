export default class FetchBuilder {
  private requestInit?: RequestInit;
  private url?: string;
  private method?: string;

  get(url: string) {
    this.method = "GET";
    this.requestInit = {};
    this.requestInit.method = this.method;
    this.url = url;
    return new FetchBuilder.Header(this);
  }

  post(url: string) {
    this.method = "POST";
    this.requestInit = {};
    this.requestInit.method = this.method;
    this.url = url;
    return new FetchBuilder.Body(this);
  }

  static Body = class Body {
    constructor(private builder: FetchBuilder) {
      this.builder = builder;
    }

    body(object: any) {
      if(typeof this.builder.requestInit === "undefined") {
        throw new Error("requestInit is undefined");
      }
      this.builder.requestInit.body = JSON.stringify(object);
      return new FetchBuilder.Header(this.builder);
    }
  }

  static Header = class Header {
    constructor(private builder: FetchBuilder) {
      this.builder = builder;
    }

    addTokenFromLocalStorage() {
      const jwt = localStorage.getItem("jwt");
      const trimmedJwt = jwt?.slice(1, -1);
      console.log(trimmedJwt);
      return this.addHeader("Authorization", `Bearer ${trimmedJwt}`);
    }


    applicationJson() {
      return this.addHeader("Content-Type", "application/json");
    }


    addHeader(key: string, value: string) {
      if(typeof this.builder.requestInit === "undefined") {
         throw new Error("requestInit is undefined");
      }
      const headers: Headers | undefined = new Headers(
        this.builder.requestInit?.headers
      );

      if (typeof headers === "undefined") {
       throw new Error("headers is undefined")
      }

      headers.set(key, value);
      this.builder.requestInit.headers = headers;
      return new FetchBuilder.Header(this.builder);
    }

    async fetch(): Promise<Response> {
      return await fetch(`${this.builder?.url}`, this.builder?.requestInit);
    }

  };
  
}
