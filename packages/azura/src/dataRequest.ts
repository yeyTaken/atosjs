import { DataRequestOptions, RequestInterceptor, ResponseInterceptor } from "./types";

class data {
  private baseURL: string;
  private headers: Record<string, string>;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.headers = headers;
  }

  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  private pickFields<T extends Record<string, any>>(obj: T, fields: readonly string[]): Partial<T> {
    const result = {} as Partial<T>;
    fields.forEach((field) => {
      if (field in obj) {
        result[field as keyof T] = obj[field as keyof T];
      }
    });
    return result;
  }

  private async request<T = any>(
    method: string,
    url: string,
    options: DataRequestOptions = {}
  ): Promise<T> {
    const combinedHeaders = { ...this.headers, ...options.headers };

    if (options.authToken) {
      combinedHeaders["Authorization"] = `Bearer ${options.authToken}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers: combinedHeaders,
    };

    if (options.body) {
      combinedHeaders["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(options.body);
    }

    let finalOptions = requestOptions;
    for (const interceptor of this.requestInterceptors) {
      finalOptions = await interceptor(finalOptions);
    }

    const response = await fetch(this.baseURL + url, finalOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }

    const responseType = options.responseType || "json";
    let responseData: any;

    switch (responseType) {
      case "text":
        responseData = await response.text();
        break;
      case "blob":
        responseData = await response.blob();
        break;
      case "arrayBuffer":
        responseData = await response.arrayBuffer();
        break;
      default:
        responseData = await response.json();
        break;
    }

    if (options.fields) {
      if (Array.isArray(responseData)) {
        responseData = responseData.map((item) =>
          this.pickFields(item as Record<string, any>, options.fields!)
        );
      } else if (typeof responseData === "object" && responseData !== null) {
        responseData = this.pickFields(responseData as Record<string, any>, options.fields);
      }
    }

    for (const interceptor of this.responseInterceptors) {
      responseData = await interceptor(responseData);
    }

    return responseData as T;
  }

  get<K extends string>(
    url: string,
    options: DataRequestOptions & { fields: readonly K[] }
  ): Promise<Record<K, any>>;
  get(url: string, options?: DataRequestOptions): Promise<any>;
  get(url: string, options?: DataRequestOptions): Promise<any> {
    return this.request("GET", url, options);
  }

  post<T = any>(url: string, options?: DataRequestOptions): Promise<T> {
    return this.request("POST", url, options);
  }

  put<T = any>(url: string, options?: DataRequestOptions): Promise<T> {
    return this.request("PUT", url, options);
  }

  delete<T = any>(url: string, options?: DataRequestOptions): Promise<T> {
    return this.request("DELETE", url, options);
  }
}

export { data };
