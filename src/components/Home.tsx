import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  font-family: 'Lato', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const NavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const NavCard = styled(Link)`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  h2 {
    color: #646cff;
    margin-top: 0;
  }

  p {
    color: #495057;
  }
`;

// // Example data type
// interface ExampleData {
//   id: number
//   name: string
//   description: string
//   status: 'active' | 'inactive'
//   createdAt: string
// }
//
// // Example data
// const exampleData: ExampleData[] = [
//   {
//     id: 1,
//     name: 'Project Alpha',
//     description: 'A sample project',
//     status: 'active',
//     createdAt: '2024-03-20'
//   },
//   {
//     id: 2,
//     name: 'Project Beta',
//     description: 'Another sample project',
//     status: 'inactive',
//     createdAt: '2024-03-19'
//   },
//   {
//     id: 3,
//     name: 'Project Gamma',
//     description: 'Yet another project',
//     status: 'active',
//     createdAt: '2024-03-18'
//   }
// ]

//
// // Column definitions
// const columns: ColumnDefinition<ExampleData>[] = [
//   {
//     header: 'ID',
//     accessor: 'id',
//     width: '80px'
//   },
//   {
//     header: 'Name',
//     accessor: 'name',
//     width: '200px'
//   },
//   {
//     header: 'Description',
//     accessor: 'description',
//     filterable: true
//   },
//   {
//     header: 'Status',
//     accessor: (item) => (
//       <span style={{
//         color: item.status === 'active' ? 'green' : 'red',
//         fontWeight: 'bold'
//       }}>
//         {item.status}
//       </span>
//     ),
//     width: '100px'
//   },
//   {
//     header: 'Created At',
//     accessor: 'createdAt',
//     width: '120px'
//   }
// ]

const Home = () => {
  return (
    <HomeContainer>
      <Title>Welcome to the Grid Suite</Title>
      <Subtitle>Select a dataset to view and manage.</Subtitle>
      <NavGrid>
        <NavCard to="/vulnerabilities">
          <h2>Vulnerability Scans</h2>
          <p>View results from the security vulnerability scanner.</p>
        </NavCard>
        <NavCard to="/logs">
          <h2>Application Logs</h2>
          <p>Explore and analyze application logs from various services.</p>
        </NavCard>
      </NavGrid>
    </HomeContainer>
  );
};

export default Home;
