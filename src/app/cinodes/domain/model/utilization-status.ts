/**
 * Utilization status of a CI node, computed from its used storage percentage.
 *
 * @summary Value type for the CI node utilization status.
 * @author Kiara Tuesta
 */
export type UtilizationStatus = 'normal' | 'warning' | 'critical';
