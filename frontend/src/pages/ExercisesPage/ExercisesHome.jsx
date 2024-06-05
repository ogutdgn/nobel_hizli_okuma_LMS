// ExercisesHome.jsx
import React from "react";
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Chip, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import exercisesData from "./exercisesData";

const ExercisesHome = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                HIZLI OKUMA EGZERSİZLERİ
              </Typography>
              <Typography variant="body2">
                Göz kaslarını geliştirme, aktif görme alanını genişletme, hızlı odaklanma gibi yeteneklerin geliştirilmesine yönelik hazırlanmış egzersizlere göz atın.
              </Typography>
              <List>
                {exercisesData.fastReadingExercises.map((exercise, index) => (
                  <ListItem button component={Link} to={`/nobelhizliokuma/admin-dashboard/egzersizler/${exercise.url}`} key={index}>
                    <ListItemText primary={exercise.name} />
                    {exercise.new && (
                      <ListItemSecondaryAction>
                        <Chip label="YENİ" color="secondary" />
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                ))}
              </List>
              <Button variant="contained" fullWidth component={Link} to="/nobelhizliokuma/admin-dashboard/egzersizler">EGZERSİZLER SAYFASI</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                HIZLI OKUMA ÇALIŞMALARI
              </Typography>
              <Typography variant="body2">
                Okuma metinleri üzerinde ritmik göz hareketleri ile okuma yeteneğini kazanabilmek için oluşturulmuş çalışmalara göz atın.
              </Typography>
              <List>
                {exercisesData.fastReadingWorkouts.map((workout, index) => (
                  <ListItem button component={Link} to={`/nobelhizliokuma/admin-dashboard/workouts/${workout.url}`} key={index}>
                    <ListItemText primary={workout.name} />
                  </ListItem>
                ))}
              </List>
              <Button variant="contained" fullWidth component={Link} to="/nobelhizliokuma/admin-dashboard/workouts">ÇALIŞMALAR SAYFASI</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                HIZLI OKUMA TESTİ
              </Typography>
              <Typography variant="body2">
                2 farklı kütüphane üzerinde bulunan 93 metin içerisinden dilediğiniz metin ile okuma hızınızı ölçebilmenizi sağlayan hızlı okuma testi sayfasına göz atın.
              </Typography>
              <List>
                {exercisesData.fastReadingTests.map((test, index) => (
                  <ListItem button component={Link} to={`/nobelhizliokuma/admin-dashboard/tests/${test.url}`} key={index}>
                    <ListItemText primary={test.name} />
                  </ListItem>
                ))}
              </List>
              <Button variant="contained" fullWidth component={Link} to="/nobelhizliokuma/admin-dashboard/tests">HIZLI OKUMA TESTİ</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExercisesHome;
