# Partner Dashboard proof of concept

RealEstateU is already well established in B2C, acquisitions made by organic search and paid ads. However B2B customers are largely untapped. This could be lucrative because a single successful deal can mean that we can sell products for tens or hundreds of agents on a recurring basis, with potential to expand through the product stack. As such we intend to increase the number of sales agents we have reaching out to businesses.

Given that this is a new form of outreach for us, we lack technical infrastructure to support these deals after they have been made. A common request we receive is for a way of tracking agent requirements and progress.

Build a **Partner Dashboard** page using the data in this folder.

Treat each JSON file as a response from a separate API endpoint. The shapes and IDs are analogous to the actual wrappers our API returns.

## Requirements

For a single partner, the dashboard should display:

- UX elements orienting the partner's name and state.
- **Stat cards** summarising the partner's activity:
  - Total students enrolled
  - Active CE agents
  - Commission earned (month-to-date)
  - Course completions, with a completion rate
- UX element for **recent Student Activity** — the most recent students with their course title, enrollment date, progress, and indication of overall status.

Stack and styling are up to you. Aim for ~3-4 hour turnaround.

## Data files

- `partners.json`
- `users.json`
- `userPackages.json`
- `userCourses.json`
- `orders.json`
- `packages.json`

The relationships between collections should be inferrable from the field names. If you think you're missing information, reach out at vay@realestateu.com.

## Deliverable

Your code, documentation (inc. run commands and dependencies), and how you'd continue the project with more time.