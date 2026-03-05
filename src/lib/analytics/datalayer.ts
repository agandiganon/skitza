type DataLayerValue = string | number | boolean | null | undefined;

type DataLayerPayload = Record<string, DataLayerValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function pushToDataLayer(eventName: string, payload: DataLayerPayload = {}): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...payload,
  });
}
