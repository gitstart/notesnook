import { Text } from "@streetwriters/rebass";
import { ReactNodeViewProps } from "../react";
import { useMemo } from "react";
import { OutlineListAttributes } from "./outline-list";
import { OutlineListItem } from "../outline-list-item";

export function OutlineListComponent(
  props: ReactNodeViewProps<OutlineListAttributes>
) {
  const { editor, getPos, node, forwardRef } = props;
  const { collapsed } = node.attrs;

  const isNested = useMemo(() => {
    const pos = editor.state.doc.resolve(getPos());
    return pos.parent?.type.name === OutlineListItem.name;
  }, []);

  return (
    <>
      <Text
        className="outline-list"
        as={"div"}
        ref={forwardRef}
        sx={{
          ul: {
            display: collapsed ? "none" : "block",
            paddingInlineStart: 0,
            paddingLeft: 0,
            marginBlockStart: isNested ? 5 : 0,
            marginBlockEnd: 0
          },
          li: {
            listStyleType: "none"
          }
        }}
      />
    </>
  );
}
