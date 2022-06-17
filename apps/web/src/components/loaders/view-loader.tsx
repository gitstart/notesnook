import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import { Box, Flex } from "rebass";
import "react-loading-skeleton/dist/skeleton.css";
import { ListLoader } from "./list-loader";

export const ViewLoader = memo(function ViewLoader() {
  return (
    <Box sx={{ m: 1 }}>
      <Flex sx={{ justifyContent: "space-between" }}>
        <Skeleton height={35} width={100} borderRadius={5} />
        <Flex>
          <Skeleton height={35} width={35} circle style={{ marginRight: 5 }} />
          <Skeleton height={35} width={35} circle />
        </Flex>
      </Flex>
      <ListLoader />
    </Box>
  );
});
