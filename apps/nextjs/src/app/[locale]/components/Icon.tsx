"use client";

import { Icon as Iconify } from "@iconify-icon/react";
import {  memo } from "react";
import type {ComponentProps} from "react";

type IconProps = ComponentProps<typeof Iconify>;

const Icon = ({ ...props }: IconProps) => {
  return <Iconify {...props} />;
};

export default memo(Icon);
