import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from "./slice";

export interface DashboardProps {}

export default function DashboardTemp(props: DashboardProps) {
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
