import { useAuthContext } from "../contexts/AuthContext";

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

export default function useFetchService(): FetchService {
  const { jwt } = useAuthContext();

  const JWT_HEADER: [string, string] = ["Authorization", `Bearer ${jwt}`];
  const APPLICATION_JSON_HEADER: [string, string] = ["Content-Type", "application/json"];

  const get = (url: string, params?: UrlParameter[], headers = [JWT_HEADER], responseFormat: ResponseFormat = ResponseFormat.JSON): Promise<any> => {
    const urlParams: string = params ? extractUrlParams(params) : "";
    const finalUrl = url + urlParams;
    const finalHeaders = headers ? new Headers(headers) : new Headers();
    const requestInit: RequestInit = { headers: finalHeaders, method: "GET" };

    return request(finalUrl, requestInit, responseFormat);
  };

  const post = (
    url: string,
    body: any | FormData,
    params?: UrlParameter[],
    headers = [JWT_HEADER, APPLICATION_JSON_HEADER],
    responseFormat: ResponseFormat = ResponseFormat.JSON
  ): Promise<any> => {
    const urlParams: string = params ? extractUrlParams(params) : "";
    const finalUrl = url + urlParams;

    let requestInitBody;
    if (body instanceof FormData) {
      requestInitBody = body;
      removeApplicationJsonHeaderFromFormData(headers);
    } else {
      requestInitBody = JSON.stringify(body);
    }

    const finalHeaders = headers ? new Headers(headers) : new Headers();

    const requestInit: RequestInit = { headers: finalHeaders, method: "POST", body: requestInitBody };
    return request(finalUrl, requestInit, responseFormat);
  };

  const put = (
    url: string,
    body: any | FormData,
    params?: UrlParameter[],
    headers = [JWT_HEADER, APPLICATION_JSON_HEADER],
    responseFormat: ResponseFormat = ResponseFormat.JSON
  ) => {
    const urlParams: string = params ? extractUrlParams(params) : "";
    const finalUrl = url + urlParams;

    let requestInitBody;
    if (body instanceof FormData) {
      requestInitBody = body;
      removeApplicationJsonHeaderFromFormData(headers);
    } else if (body) {
      requestInitBody = JSON.stringify(body);
    }

    const finalHeaders = headers ? new Headers(headers) : new Headers();

    const requestInit: RequestInit = { headers: finalHeaders, method: "PUT", body: requestInitBody };

    return request(finalUrl, requestInit, responseFormat);
  };

  const patch = (
    url: string,
    body: any | FormData,
    params?: UrlParameter[],
    headers = [JWT_HEADER, APPLICATION_JSON_HEADER],
    responseFormat: ResponseFormat = ResponseFormat.JSON
  ) => {
    const urlParams: string = params ? extractUrlParams(params) : "";
    const finalUrl = url + urlParams;

    let requestInitBody;
    if (body instanceof FormData) {
      requestInitBody = body;
      removeApplicationJsonHeaderFromFormData(headers);
    } else if (body) {
      requestInitBody = JSON.stringify(body);
    }

    const finalHeaders = headers ? new Headers(headers) : new Headers();

    const requestInit: RequestInit = { headers: finalHeaders, method: "PATCH", body: requestInitBody };

    return request(finalUrl, requestInit, responseFormat);
  };

  const deleteRequest = (
    url: string,
    params?: UrlParameter[],
    headers = [JWT_HEADER],
    responseFormat: ResponseFormat = ResponseFormat.JSON
  ): Promise<any> => {
    const urlParams: string = params ? extractUrlParams(params) : "";
    const finalUrl = url + urlParams;
    const finalHeaders = headers ? new Headers(headers) : new Headers();
    const requestInit: RequestInit = { headers: finalHeaders, method: "DELETE" };

    return request(finalUrl, requestInit, responseFormat);
  };

  const request = (url: string, requestInit: RequestInit, responseFormat: ResponseFormat): Promise<any> => {
    return fetch(url, requestInit).then((response) => extractResponseBody(response, responseFormat));
  };

  const extractUrlParams = (params: UrlParameter[]): string => {
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
  };

  const removeApplicationJsonHeaderFromFormData = (headers: [string, string][]) => {
    const index = headers.findIndex((header) => header[0] === "Content-Type" && header[1] === "application/json");
    if (index > -1) headers.splice(index, 1);
  };

  const extractResponseBody = (response: Response, responseFormat: ResponseFormat): any => {
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
  };

  return {
    get,
    post,
    put,
    patch,
    deleteRequest,
  };
}
