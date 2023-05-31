import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Link, useLocation } from "react-router-dom";

type TBreadcrumb = {
  path: string;
  title: string;
};
export interface BreadcrumbProps {}

export default function BreadcrumbCustom(props: BreadcrumbProps) {
  const location = useLocation();
  const { pathname } = location;
  const pathnames = pathname.split("/").filter((item) => item);

  const breadcrumbItems: TBreadcrumb[] = pathnames.map((item) => {
    return { path: `/${item}`, title: item };
  });

  function itemRender(
    route: any,
    params: any,
    items: ItemType[],
    paths: any[]
  ) {
    const last = items.indexOf(route) === items.length - 1;
    return last ? (
      <span>{route.title}</span>
    ) : (
      <Link to={paths.join("/")}>{route.title}</Link>
    );
  }

  return (
    <Breadcrumb
      style={{ margin: "16px 0" }}
      itemRender={itemRender}
      items={[{ path: "/", title: "Home" }, ...breadcrumbItems]}
    ></Breadcrumb>
  );
}
