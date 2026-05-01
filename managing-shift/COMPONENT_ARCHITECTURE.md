# Shift Managing Web App - Component Architecture Proposal

## 0) Path & Scope Clarification

이 문서는 **리포지토리 루트가 `shift-managing`** 일 때를 기준으로 작성되었습니다.

- Windows 로컬 경로 예시: `C:\Users\MJ\Documents\workSpaces\shift_managing`
- 실제 React 앱 경로: `C:\Users\MJ\Documents\workSpaces\shift_managing\managing-shift`
- 따라서 아래 구조의 `src/`는 `managing-shift/src/`를 의미합니다.

```text
shift_managing/
  managing-shift/
    src/
```

## 1) Current Project Analysis

- This repository is currently a **React + Vite starter template**.
- UI logic exists almost entirely in a single `App.jsx` file and includes starter/demo sections (`Get started`, docs/social links).
- There is no domain-specific screen/component for shift management yet.

## 2) Goals for Next UI Phase

Given your backend is already prepared, front-end should prioritize:

1. **Clear domain boundaries** (Schedule, Employee, Request, Auth, Admin).
2. **Reusable UI components** for forms/tables/modals/status indicators.
3. **Container vs Presentational separation** so API-connected pages and pure UI stay decoupled.
4. **Predictable state model** for filtering dates/roles/locations and managing optimistic updates.

## 3) Recommended Component Tree (Feature-Oriented)

```text
App
 ├─ AppProviders
 │   ├─ RouterProvider
 │   ├─ QueryClientProvider
 │   └─ AuthProvider
 ├─ AppLayout
 │   ├─ TopBar
 │   ├─ SideNav
 │   └─ MainContent
 │       └─ RouteOutlet
 │
 ├─ DashboardPage
 │   ├─ KpiCards
 │   ├─ TodayCoverageCard
 │   └─ PendingRequestsCard
 │
 ├─ SchedulePage
 │   ├─ ScheduleToolbar
 │   │   ├─ DateRangePicker
 │   │   ├─ TeamFilter
 │   │   └─ PublishButton
 │   ├─ ScheduleCalendarView
 │   ├─ ScheduleTableView
 │   └─ ShiftEditorDrawer
 │       ├─ ShiftForm
 │       └─ ConflictWarnings
 │
 ├─ EmployeesPage
 │   ├─ EmployeeFilterBar
 │   ├─ EmployeeTable
 │   └─ EmployeeFormModal
 │
 ├─ ShiftRequestsPage
 │   ├─ RequestFilterTabs
 │   ├─ RequestList
 │   └─ RequestActionModal
 │
 └─ SettingsPage
     ├─ BusinessHoursForm
     ├─ RolePolicyForm
     └─ NotificationSettings
```

## 4) Folder Structure Proposal

```text
src/
  app/
    providers/
    router/
    layout/
  pages/
    dashboard/
    schedule/
    employees/
    requests/
    settings/
  features/
    schedule/
      api/
      components/
      hooks/
      utils/
      types/
    employees/
    requests/
    auth/
  shared/
    components/
      ui/
      feedback/
      data-display/
      form/
    hooks/
    lib/
    constants/
    styles/
  assets/
```

## 5) Component Design Rules

### A. Container / Presentational Split
- `pages/*` and `features/*/components/*Container.jsx`: data fetching, mutations, orchestration.
- `shared/components/*`: pure presentational components with typed props and no API dependency.

### B. Entity-based Models
Keep each entity (Employee, Shift, Location, Request) in separate model/types and avoid mega-objects.

### C. Async Flow Standards
- Loading: skeletons per page + inline spinners for button actions.
- Error: top-level error banner + local form validation errors.
- Empty: explicit empty states with CTA (e.g., "Create first shift").

### D. Permission-aware Rendering
Expose hooks like `useCanEditSchedule`, `useCanApproveRequest` to keep role-based UI logic centralized.

## 6) First Components to Build (Suggested Order)

1. `AppLayout` (TopBar, SideNav, Content shell)
2. `SchedulePage` skeleton (toolbar + calendar/table toggle)
3. `ShiftCard` and `ShiftEditorDrawer`
4. `EmployeeTable` and `EmployeeFormModal`
5. `RequestList` + approve/reject actions
6. Dashboard summary cards

This order gives you visible value fast while staying compatible with backend integrations.

## 7) API Integration Boundary

For each feature:
- `features/<feature>/api/*.js`: API clients only.
- `features/<feature>/hooks/useXxxQuery.js`: React Query hooks wrapping API clients.
- UI components consume hooks, not raw fetch calls.

This makes backend endpoint changes localized and keeps UI stable.

## 8) Suggested Shared UI Primitives

- Inputs: `TextField`, `Select`, `DatePicker`, `TimePicker`, `SearchInput`
- Data display: `DataTable`, `Badge`, `Avatar`, `EmptyState`
- Feedback: `Toast`, `InlineAlert`, `ConfirmDialog`, `Skeleton`
- Navigation: `Tabs`, `Breadcrumbs`, `Pagination`

## 9) Migration Plan from Current Starter

1. Remove starter sections from `App.jsx`.
2. Introduce router and `AppLayout`.
3. Add page-level placeholders for each module.
4. Incrementally replace placeholders with feature containers.
5. Move shared styles to `shared/styles` and use feature-scoped styles/modules.
