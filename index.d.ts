/** Subscription callback
 * @param value new value of the store
 */
type Subscriber<T> = (value:T) => void
type Unsubscriber = () => void
type OnLast = () => void
type OnFirst = () => OnLast | void
type ComputedSubscriber<T> = (value:T)=>any

type Stores = StorxyStore<any> | [StorxyStore<any>, ...Array<StorxyStore<any>>] | Array<StorxyStore<any>>;
type StoresValues<T> = T extends StorxyStore<infer U> ? U :
	{ [K in keyof T]: T[K] extends StorxyStore<infer U> ? U : never };

/** Interface of Storxy stores */
interface StorxyStore<T> {
  /** Value of the store */
  $: T
  /** Store subscription 
   * @param handler callback to handle store value on each change
  */
  subscribe(handler: Subscriber<T>):Unsubscriber
  /** Shortcut for store subscription 
   * @param handler callback to handle store value on each change
  */
  $$(handler: Subscriber<T>):Unsubscriber
}

/** Create a store
 * @param value initial value
 * @param onfirst callbacks for first and last subscribers
 */
export function store<T>(
  value?:T,
  onfirst?:OnFirst
): StorxyStore<T>

/** Create a computed store
 * @param deps store or array of stores
 * @param handler will recieve every stores values when one of them changes
 */
export function computed<S extends Stores, T>(
  deps: S,
  handler: (values: StoresValues<S>) => void,
): StorxyStore<T>
