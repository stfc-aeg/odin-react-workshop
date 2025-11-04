import type { ParamTree } from "odin-react";

/**
 * A Typescript Interface that defines what the Parameter Tree of the Adapter might look like
 *  
 * This allows things that use the data from the Endpoint to know what parameters are available.
 * 
 */
export interface WorkshopParams extends ParamTree{
  /**A string Value that can be read and written */
  string_val: string;
  /**A Number Parameter that can be read and written.
   * 
   * The Adapter also defines a Min and Max value in this Parameter's Metadata
   */
  num_val: number;
  num_details: {
      is_even: boolean;
      half: number;
  }
  /**A Random number that gets changed by the adapter every 100 milliseconds */
  rand_num: number;
  selected_list: string[];
  selected: string;
  toggle: boolean;
  trigger: null;
}