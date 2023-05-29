import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from "./dashboardSlice";

export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  // console.log(loading,statistics,highestStudentList,lowStudentList,rankingByCityList);

  useEffect(() => {
    dispatch(() => {
      dispatch(dashboardActions.fetchData());
    });
  }, [dispatch]);
  return <div>Dashboard</div>;
}
