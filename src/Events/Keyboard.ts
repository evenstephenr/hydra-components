/**
 * This module should accept a ref or query string to attach callbacks to keydown events,
 *  also providing a mechanism to de-register some or all of the events
 *
 * WIP implementation concepts...
 *
 * custom hook?
 * = useClick(...) ???
 *
 * regular function?
 * - registerClicks(ref, {
 *  'Enter': () => console.log('enter key pressed'),
 *   43: () => console.log('lol what is this key')
 * })
 */
export const useKeydown = () => console.log("TODO");
