interface FetchService {
  get: (url: string, params?: UrlParameter[], headers?: [string, string][], responseFormat?: ResponseFormat) => Promise<any>;
  post: (url: string, body: any | FormData, params?: UrlParameter[], headers?: [string, string][], responseFormat?: ResponseFormat) => Promise<any>;
  put: (url: string, body: any | FormData, params?: UrlParameter[], headers?: [string, string][], responseFormat?: ResponseFormat) => Promise<any>;
  patch: (url: string, body: any | FormData, params?: UrlParameter[], headers?: [string, string][], responseFormat?: ResponseFormat) => Promise<any>;
  deleteRequest: (url: string, params?: UrlParameter[], headers?: [string, string][], responseFormat?: ResponseFormat) => Promise<any>;
}

export interface UrlParameter {
  key: string;
  value: string;
}

export enum ResponseFormat {
  RESPONSE,
  JSON,
  BLOB,
  ARRAYBUFFER,
}

function get(url: string, params?: UrlParameter[], headers?: [string, string][], responseFormat: ResponseFormat = ResponseFormat.JSON): Promise<any> {
  const urlParams: string = params ? extractUrlParams(params) : "";
  const finalUrl = url + urlParams;
  const finalHeaders = headers ? new Headers(headers) : new Headers();
  const requestInit: RequestInit = { headers: finalHeaders, method: "GET" };

  return request(finalUrl, requestInit, responseFormat);
}

function post(
  url: string,
  body: any | FormData,
  params?: UrlParameter[],
  headers?: [string, string][],
  responseFormat: ResponseFormat = ResponseFormat.JSON
): Promise<any> {
  const urlParams: string = params ? extractUrlParams(params) : "";
  const finalUrl = url + urlParams;
  const finalHeaders = headers ? new Headers(headers) : new Headers();
  let requestInitBody;
  if (body instanceof FormData) {
    requestInitBody = body;
  } else {
    requestInitBody = JSON.stringify(body);
  }
  const requestInit: RequestInit = { headers: finalHeaders, method: "POST", body: requestInitBody };
  return request(finalUrl, requestInit, responseFormat);
}

function put(
  url: string,
  body: any | FormData,
  params?: UrlParameter[],
  headers?: [string, string][],
  responseFormat: ResponseFormat = ResponseFormat.JSON
) {
  const urlParams: string = params ? extractUrlParams(params) : "";
  const finalUrl = url + urlParams;
  const finalHeaders = headers ? new Headers(headers) : new Headers();
  let requestInitBody;
  if (body instanceof FormData) {
    requestInitBody = body;
  } else if (body) {
    requestInitBody = JSON.stringify(body);
  }

  const requestInit: RequestInit = { headers: finalHeaders, method: "PUT", body: requestInitBody };

  return request(finalUrl, requestInit, responseFormat);
}

function patch(
  url: string,
  body: any | FormData,
  params?: UrlParameter[],
  headers?: [string, string][],
  responseFormat: ResponseFormat = ResponseFormat.JSON
) {
  const urlParams: string = params ? extractUrlParams(params) : "";
  const finalUrl = url + urlParams;
  const finalHeaders = headers ? new Headers(headers) : new Headers();
  let requestInitBody;
  if (body instanceof FormData) {
    requestInitBody = body;
  } else if (body) {
    requestInitBody = JSON.stringify(body);
  }

  const requestInit: RequestInit = { headers: finalHeaders, method: "PATCH", body: requestInitBody };

  return request(finalUrl, requestInit, responseFormat);
}

function deleteRequest(
  url: string,
  params?: UrlParameter[],
  headers?: [string, string][],
  responseFormat: ResponseFormat = ResponseFormat.JSON
): Promise<any> {
  const urlParams: string = params ? extractUrlParams(params) : "";
  const finalUrl = url + urlParams;
  const finalHeaders = headers ? new Headers(headers) : new Headers();
  const requestInit: RequestInit = { headers: finalHeaders, method: "DELETE" };

  return request(finalUrl, requestInit, responseFormat);
}

function request(url: string, requestInit: RequestInit, responseFormat: ResponseFormat): Promise<any> {
  return fetch(url, requestInit).then((response) => extractResponseBody(response, responseFormat));
}

function extractUrlParams(params: UrlParameter[]): string {
  let urlParams: string = "";

  for (let i = 0; i < params.length; i++) {
    if (i === 0) {
      urlParams = urlParams + "?";
    } else {
      urlParams = urlParams + "&";
    }
    urlParams = urlParams + `${params[i].key}=${params[i].value}`;
  }

  return urlParams;
}

function extractResponseBody(response: Response, responseFormat: ResponseFormat): any {
  switch (responseFormat) {
    case ResponseFormat.RESPONSE:
      return response;
    case ResponseFormat.JSON:
      return response.json();
    case ResponseFormat.BLOB:
      return response.blob();
    case ResponseFormat.ARRAYBUFFER:
      return response.arrayBuffer();
    default:
      throw new Error("Error occured with response format");
  }
}

const fetchService: FetchService = {
  get,
  post,
  put,
  patch,
  deleteRequest,
};

export default fetchService;
