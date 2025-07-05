// src/redux/hooks.js
import { useDispatch, useSelector } from 'react-redux';
import { useDispatch as useAppDispatchType } from '@reduxjs/toolkit';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
