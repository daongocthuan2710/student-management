import {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectStudentList, selectStudentLoading, studentActions } from './studentSlice';

export interface StudentProps {
}

export function Student (props: StudentProps) {
  const dispatch = useAppDispatch()
  
  const loading = useAppSelector(selectStudentLoading)
  const studentList = useAppSelector(selectStudentList)

  console.log('studentList', studentList);
  
  
  useEffect(()=>{
    dispatch(()=>{
      dispatch(studentActions.fetchData())
    })
  }, [dispatch])

  return (
    <div>
      Student
    </div>
  );
}