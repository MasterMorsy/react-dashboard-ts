import React from "react";
import { If } from "../../components/If";

interface BasicComponentProps {
  key?: string;
  children: React.ReactNode;
}

interface RenderLayoutProps {
  layout?: React.FunctionComponent<BasicComponentProps>;
  children: React.ReactNode;
}

interface defaultLayoutProps {
  children?: React.ReactNode;
}

const defaultLayout = ({ children }: defaultLayoutProps) => <>{children}</>;

export default function RenderLayout({
  layout: Layout = defaultLayout,
  children,
}: RenderLayoutProps) {
  return (
    <>
      <If condition={Layout}>
        <Layout>{children}</Layout>
      </If>
      <If condition={!Layout}>{children}</If>
    </>
  );
}
