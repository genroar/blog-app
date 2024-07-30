import axios from 'axios';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Container, Card, CardContent, Typography, List, ListItem, ListItemText, styled, Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface HomeProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  const posts = res.data;

  return {
    props: {
      posts,
    },
  };
};

// Styled components
const StyledListItem = styled(ListItem)({
  cursor: 'pointer',
  marginBottom: '10px',
});

const PostCard = styled(Card)({
  marginBottom: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const TitleTypography = styled(Typography)({
  fontWeight: 600,
  marginBottom: '10px',
});

const BodyTypography = styled(Typography)({
  color: '#555',
  marginBottom: '10px',
});

export default function Home({ posts }: HomeProps) {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/post/${id}`);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Blog Posts
      </Typography>
      <List>
        {posts.map((post) => (
          <StyledListItem key={post.id} button onClick={() => handleClick(post.id)}>
            <PostCard>
              <CardContent>
                <TitleTypography variant="h6">{post.title}</TitleTypography>
                <BodyTypography variant="body2">{post.body.substring(0, 100)}...</BodyTypography>
                <Button variant="contained" color="primary" onClick={() => handleClick(post.id)}>
                  Read More
                </Button>
              </CardContent>
            </PostCard>
          </StyledListItem>
        ))}
      </List>
    </Container>
  );
}
