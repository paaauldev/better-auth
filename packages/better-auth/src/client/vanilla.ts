import { getClientConfig } from "./config";
import { capitalizeFirstLetter } from "../utils/misc";
import type {
	AuthClientPlugin,
	ClientOptions,
	InferActions,
	InferClientAPI,
	IsSignal,
} from "./types";
import { createDynamicPathProxy } from "./proxy";
import { getSessionAtom } from "./session-atom";
import type { UnionToIntersection } from "../types/helper";

type InferResolvedHooks<O extends ClientOptions> = O["plugins"] extends Array<
	infer Plugin
>
	? Plugin extends AuthClientPlugin
		? Plugin["getAtoms"] extends (fetch: any) => infer Atoms
			? Atoms extends Record<string, any>
				? {
						[key in keyof Atoms as IsSignal<key> extends true
							? never
							: key extends string
								? `use${Capitalize<key>}`
								: never]: () => Atoms[key];
					}
				: {}
			: {}
		: {}
	: {};

export function createAuthClient<Option extends ClientOptions>(
	options?: Option,
) {
	const {
		pluginPathMethods,
		pluginsActions,
		pluginsAtoms,
		$fetch,
		atomListeners,
	} = getClientConfig(options);
	let resolvedHooks: Record<string, any> = {};
	for (const [key, value] of Object.entries(pluginsAtoms)) {
		resolvedHooks[`use${capitalizeFirstLetter(key)}`] = value;
	}
	const { $session, _sessionSignal } = getSessionAtom<Option>($fetch);
	const routes = {
		...pluginsActions,
		...resolvedHooks,
		$fetch,
		useSession: $session,
	};
	const proxy = createDynamicPathProxy(
		routes,
		$fetch,
		pluginPathMethods,
		{
			...pluginsAtoms,
			_sessionSignal,
		},
		atomListeners,
	);
	return proxy as UnionToIntersection<InferResolvedHooks<Option>> &
		InferClientAPI<Option> &
		InferActions<Option> & {
			useSession: typeof $session;
			$fetch: typeof $fetch;
		};
}