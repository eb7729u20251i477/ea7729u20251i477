/**
 * Marker interface for the response envelopes returned by an API.
 *
 * @summary Base response interface.
 * @author Kiara Tuesta
 */
export interface BaseResponse {}

/**
 * Base contract for the API resources that expose a numeric identifier.
 *
 * @summary Base resource interface.
 * @author Kiara Tuesta
 */
export interface BaseResource {
  /** Unique identifier of the resource. */
  id: number;
}
