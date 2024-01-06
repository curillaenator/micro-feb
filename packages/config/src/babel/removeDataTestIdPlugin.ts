import type { PluginItem } from '@babel/core';

export function removeDataTestIdPlugin(): PluginItem {
  return {
    visitor: {
      Program(path, state) {
        const propsToRemove = (state.opts.props || []) as string[];

        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name;

            if (propsToRemove.includes(nodeName)) {
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
}
