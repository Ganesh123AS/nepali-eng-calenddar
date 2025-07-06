import { validateMultipleYears } from "../validate/test";

export const baseMonthDays2070: Record<number, number> = Object.fromEntries([
    ...[7, 10].map(m => [m, 29]),
    ...[8, 9, 11, 12].map(m => [m, 30]),
    ...[1, 2, 3, 5, 6].map(m => [m, 31]),
    ...[4].map(m => [m, 32]),
]);

export const baseMonthDays2071: Record<number, number> = Object.fromEntries([
    ...[8, 10].map(m => [m, 29]),
    ...[7, 9, 11, 12].map(m => [m, 30]),
    ...[1, 2, 4, 5, 6].map(m => [m, 31]),
    ...[3].map(m => [m, 32]),
]);

export const baseMonthDays2072: Record<number, number> = Object.fromEntries([
    ...[8, 10].map(m => [m, 29]),
    ...[6, 7, 9, 11, 12].map(m => [m, 30]),
    ...[1, 3, 5].map(m => [m, 31]),
    ...[2, 4].map(m => [m, 32]),
]);

export const baseMonthDays2073: Record<number, number> = Object.fromEntries([
    ...[9, 10].map(m => [m, 29]),
    ...[6, 7, 8, 11].map(m => [m, 30]),
    ...[1, 3, 5, 12].map(m => [m, 31]),
    ...[2, 4, ].map(m => [m, 32]),
]);

export const baseMonthDays2080: Record<number, number> = Object.fromEntries([
    ...[9, 10].map(m => [m, 29]),
    ...[6, 7, 8, 11, 12].map(m => [m, 30]),
    ...[1, 3, 5].map(m => [m, 31]),
    ...[2, 4].map(m => [m, 32]),
]);

export const baseMonthDays2081: Record<number, number> = Object.fromEntries([
    ...[9, 11].map(m => [m, 29]),
    ...[6, 7, 8, 10].map(m => [m, 30]),
    ...[1, 3, 5, 12].map(m => [m, 31]),
    ...[2, 4].map(m => [m, 32]),
]);

export const baseMonthDays2082: Record<number, number> = Object.fromEntries([
    ...[8, 10].map(m => [m, 29]),
    ...[7, 9, 11, 12].map(m => [m, 30]),
    ...[1, 2, 4, 5, 6].map(m => [m, 31]),
    ...[3].map(m => [m, 32]),
]);

export const baseMonthDaysAllYear: Record<number, number> = Object.fromEntries([
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => [m, 32]),
]);


export const baseMonth365DaysDefault: Record<number, number> = Object.fromEntries([
    ...[1, 3, 5, 7, 8, 10, 12].map(m => [m, 30]),
    ...[2, 4, 6, 9, 11].map(m => [m, 31]),
]);

export const Days366Default: Record<number, number> = Object.fromEntries([
    ...[1, 3, 5, 7, 8, 10, 12].map(m => [m, 30]),
    ...[2, 4, 6, 9, 11].map(m => [m, 31]),
]);



// validateMultipleYears({ baseMonthDays2081 });
