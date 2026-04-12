import { Box, Button, Container, Typography } from "@mui/material";

function Hero(){
    return(
        <Box sx={{py:10}}>
            <Container maxwidth="lg">
                <Typography variant="overline" sx={{color:"secondary.main"}}>
                    Formula 1 Dashboard
                </Typography>
                <Typography variant="h2" sx={{color: "text.primary",mt:1,mb:2}}>
                    Explore Ferrari through data
                </Typography>
                <Typography variant="body1" sx={{color: "text.secondary",maxWidth: "600px",mb:4}}>
                    View Ferrari race information, team stats, charts, and results in one place
                </Typography>
                <Button variant="contained" color="primary" sx={{mr:2}}>
                    View Results
                </Button>
                <Button variant="outlined" color="primary">
                    Team Stats
                </Button>
            </Container>
        </Box>

    );
}

export default Hero;