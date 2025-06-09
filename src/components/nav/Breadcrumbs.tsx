import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

// Types/interfaces
interface BreadcrumbItem {
  label: string;
  path: string;
  state?: Record<string, any>; // Add state for navigation
}

// Component definition
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const breadcrumbItems: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

  // Handle a details page as a special case
  if (pathnames[0] === 'details' && pathnames[1]) {
    const detailsId = pathnames[1];

    // Get the grid's path and name from the navigation state. This is more reliable.
    const gridPath = location.state?.gridPath || '/';
    const gridName =
      gridPath.replace('/', '').charAt(0).toUpperCase() + gridPath.slice(2);

    // Add the link back to the grid page (e.g., "Vulnerabilities")
    breadcrumbItems.push({
      label: gridName,
      path: gridPath,
      state: { focusId: detailsId }, // Pass focusId for returning to the correct row
    });

    // Add the current item as the last, non-linked part of the breadcrumb
    breadcrumbItems.push({
      label: `Item ${detailsId}`,
      path: location.pathname,
    });
  } else if (pathnames.length > 0) {
    // Handle all other pages (like /vulnerabilities, /logs)
    let currentPath = '';
    pathnames.forEach((value) => {
      currentPath += `/${value}`;
      breadcrumbItems.push({
        label: value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' '),
        path: currentPath,
      });
    });
  }

  return (
    <Nav aria-label="Breadcrumb">
      <List>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <ListItem key={item.path + item.label}>
              {isLast ? (
                <CurrentPage aria-current="page">{item.label}</CurrentPage>
              ) : (
                <StyledLink
                  to={item.path}
                  state={item.state}
                  aria-label={`Go to ${item.label}`}
                >
                  {item.label}
                </StyledLink>
              )}
            </ListItem>
          );
        })}
      </List>
    </Nav>
  );
};

// Styled components
const Nav = styled.nav`
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
`;

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.9rem;

  &:not(:last-child)::after {
    content: '/';
    margin: 0 0.5rem;
    color: #999;
  }
`;

const StyledLink = styled(Link)`
  color: #646cff;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #535bf2;
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid #646cff;
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

const CurrentPage = styled.span`
  color: #333;
  font-weight: 500;
`;

// Export default at the end
export default Breadcrumbs;
