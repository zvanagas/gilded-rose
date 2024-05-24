# Gilded Rose refactoring

## Goal

Write easily readable, maintainable code that could be easily extended (for example with conjured item)

## Plan

This refactoring uses TDD (test-driven development) as at first unit tests were written to cover every condition. To make sure that everything is covered - coverage was checked for the whole class. Whole plan looked like this:

1. Write unit tests while trying to cover all edge cases (for example, when quality is above 50 or below 0)
2. Refactor the code in that way that all unit tests passes
3. Add visualisation of all possible items by using tailwind, shadcdn-ui
4. Add Conjured item

## How to launch this app

1. Run `pnpm install`
2. Run `pnpm run dev`
