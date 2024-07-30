import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container, Typography, Paper, styled, Box, Divider } from '@mui/material';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PostProps {
  post: Post;
  comments: Comment[];
}

// Styled components
const StyledPaper = styled(Paper)({
  padding: '20px',
  margin: '20px 0',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
});

const TitleTypography = styled(Typography)({
  fontWeight: 600,
  marginBottom: '20px',
});

const BodyTypography = styled(Typography)({
  color: '#333',
});

const CommentsSection = styled(Box)({
  marginTop: '20px',
});

const CommentPaper = styled(Paper)({
  padding: '10px',
  marginBottom: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  const posts = res.data;

  const paths = posts.map((post: Post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params!.id}`);
  const commentsRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params!.id}/comments`);
  const post = postRes.data;
  const comments = commentsRes.data;

  return {
    props: {
      post,
      comments,
    },
  };
};

export default function PostDetail({ post, comments }: PostProps) {
  return (
    <Container maxWidth="md">
      <StyledPaper>
        <TitleTypography variant="h4" component="h1" gutterBottom>
          {post.title}
        </TitleTypography>
        <BodyTypography variant="body1" component="p">
          {post.body}
        </BodyTypography>
      </StyledPaper>

      <CommentsSection>
        <Typography variant="h5" component="h2" gutterBottom>
          Comments
        </Typography>
        {comments.map((comment: Comment) => (
          <CommentPaper key={comment.id}>
            <Typography variant="subtitle1" component="h3" gutterBottom>
              {comment.name}
            </Typography>
            <Typography variant="body2" component="p">
              {comment.body}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {comment.email}
            </Typography>
          </CommentPaper>
        ))}
      </CommentsSection>
    </Container>
  );
}
