import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.sass';
import { withAuthentication } from './components/withAuthentication';
import { withNavbar } from './components/withNavbar';
import { withSideMenu } from './components/withSideMenu';
import { Footer } from './components/Footer';
import { SignUp } from './modules/signup/SignUp';
import { SignUpSuccessful } from './modules/signup/SignUpSuccessful';
import { LogIn } from './modules/login/LogIn';
import { Landing } from './modules/Landing';
import { About } from './modules/About';
import { TermsAndConditions } from './modules/TermsAndConditions';
import { PrivacyPolicy } from './modules/PrivacyPolicy';
import { Licenses } from './modules/Licenses';
import { MyMovies } from './modules/my-movies/MyMovies';
import { Movie } from './modules/movies/Movie';
import { Search } from './modules//search/Search';
import { Recommendations } from './modules/recommendations/Recommendations';
import { Statistics } from './modules/statistics/Statistics';
import { Profile } from './modules/profile/Profile';
import { NotFound } from './modules/NotFound';
import { useScrollToTop } from './hooks/useScrollToTop';

export const App: React.FC = () => {
  useScrollToTop();

  return (
    <>
      <Switch>
        <Route
          path="/movie/:id"
          component={withAuthentication(withNavbar(withSideMenu(Movie)))}
        />
        <Route
          path="/my-movies"
          component={withAuthentication(withNavbar(withSideMenu(MyMovies)))}
        />
        <Route
          path="/search"
          component={withAuthentication(withNavbar(withSideMenu(Search)))}
        />
        <Route
          path="/recommendations"
          component={withAuthentication(
            withNavbar(withSideMenu(Recommendations))
          )}
        />
        <Route
          path="/statistics"
          component={withAuthentication(withNavbar(withSideMenu(Statistics)))}
        />
        <Route
          path="/profile"
          component={withAuthentication(withNavbar(withSideMenu(Profile)))}
        />
        <Route path="/signup/success" component={SignUpSuccessful} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/about" component={withNavbar(About)} />
        <Route path="/terms" component={withNavbar(TermsAndConditions)} />
        <Route path="/privacy" component={withNavbar(PrivacyPolicy)} />
        <Route path="/licenses" component={withNavbar(Licenses)} />
        <Route exact path="/" component={withNavbar(Landing)} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
};
