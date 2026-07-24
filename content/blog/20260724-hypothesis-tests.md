+++
title = 'How do you design a hypothesis test?'
date = 2026-07-24T14:10:27+01:00
draft = false
+++

Let's pretend that you are a researcher looking at the effects of a particular
drug on blood pressure. You have a suspicion that it has an unintended effect
on blood pressure (but you aren't sure if it raises blood pressure or lowers
it).

You've run a trial, and have collected some data. The data is a collection of
numbers, where each number represents the change in blood pressure of a
particular trial participant before and after taking the drug. You reason that
if the drug really does have an effect, then the numbers should either all tend
to be positive (increase in pressure) or tend to be negative (decrease in
pressure). If there is no overall effect, then the numbers should be centred
around zero.

You look at your data, and see that some numbers are positive and some are
negative, but you are not sure if you see an overall trend. How can you take
your data, and quantitatively test your belief on whether the drug has any
effect on the blood pressure at all? This is the job of a [hypothesis
test](https://en.wikipedia.org/wiki/Statistical_hypothesis_test).

Well, how does one design a hypothesis test when you have questions like this?
In this article, I'll give you a taste of the process by walking through what
you might do for our made-up scenario above.

## 1. Give a form to the generative distribution

The first step in mathematically formalising our question into a hypothesis
test is to make some assumptions (educated guesses!) about the underlying
probability distribution generating your data. As a way to do this, let's start
to talk about our data and distributions using mathematical symbols.

Let's say that we have $n$ data points. We'll call them $\mathbf{x} =
\{x_i\}_{i=1}^n$. We can imagine that our data is actually a sample from some
unknown generative distribution $f$. The thinking is that if we can somehow
manage to characterise $f$, we might glean some insights into the actual
process that generated the data (i.e. whether there seems to be a real change
in blood pressure).

Where can we start? Well, since our data points are continuous variables
resulting from complex biological processes, we could invoke the [central limit
theorem](https://www.youtube.com/watch?v=zeJD6dqJ5lo) to assume that the data
is likely distributed according to a [normal
distribution](https://en.wikipedia.org/wiki/Normal_distribution). If $f$ is a
normal distribution, it can be described by two parameters: its mean and
variance. To make our lives simple, let's just fix $f$'s variance as the
empirical variance $\hat{\sigma}^2$ as seen in the data $\mathbf{x}$. This is
an oversimplification, and we technically shouldn't do this, but for the sake
of simplicity we will pretend we don't have to worry about the variance. That
leaves us with one free parameter, the mean, to play around with. We will
assign the symbol $\theta$ to the mean parameter, so that the [probability
density function](https://en.wikipedia.org/wiki/Probability_density_function)
$f$ can be written as:

$$
f(x | \theta) = \frac{1}{\hat{\sigma} \sqrt{2\pi}} e^{ -\frac{1}{2} \left( \frac{x-\theta}{\hat{\sigma}}\right)^2 }
$$

Now we can start to discuss our hypothesis test in a more precise language. We
think that our data $\mathbf{x}$ comes from a normal distribution like $f$. We
also think that if the drug really causes increases in blood pressure, our
should be centered around a positive value, which means that $\theta$ should be
positive, and vice versa ($\theta < 0$) if there is a reduction in blood
pressure. If there is no effect, then we would expect $\theta = 0$. As you can
see, our hypothesis test is linked to our belief of what the true value of
$\theta$ is. More specifically, our null hypothesis (conventionally denoted
$H_0$) is that there is no effect, or that $\theta = 0$, and our alternative
hypothesis (denoted $H_1$) is that there is _some_ effect (either up or down),
or that $\theta \not = 0$.

More formally, we would say that $f$ is a [parametric
distribution](https://en.wikipedia.org/wiki/Parametric_statistics) with one
unknown parameter $\theta$. We can then think of $f$ as being a member of a
family of distributions $\mathcal{F} = \{f_{\theta}: \theta \in \Theta\}$,
where $\theta$ can be anything. We then split the parameter space $\Theta$ into
two parts: the null parameter space $\Theta_0$, and its complement
$\Theta_0^c$. $\Theta_0$ consists of values of $\theta$ corresponding to the
null hypothesis, whereas $\Theta_0^c$ corresponds to the alternative
hypothesis, and thus usually contains more interesting values of $\theta$.
That is, the null hypothesis $H_0$ can now be written as $\theta \in
\Theta_0$, and the alternative hypothesis $H_1$ as $\theta \notin \Theta_0$, or
$\theta \in \Theta_0^c$.

To bring it back to our concrete example, our parameter $\theta$ is a real
number, so $\Theta = \reals$, $\Theta_0 = \{0\}$ and $\Theta_0^c = \{\theta:
\theta \in \reals, \theta \not = 0\}$.

Now that we have a mathematical framework for our hypotheses, how can we test
our belief on whether the true $\theta$ lies inside $\Theta_0$ or $\Theta_0^c$,
based on the data $\mathbf{x}$?

## 2. Pick a hypothesis testing framework

We need a system where we can use the available data to compute some
statistic, then depending on the value of the statistic, either reject or
accept $H_0$. There are many strategies/frameworks with which one can come up
with a test statistic, but for this example let’s use the very common and
useful [likelihood ratio
test](https://en.wikipedia.org/wiki/Likelihood-ratio_test) (LRT). The LRT
involves a test statistic $\lambda$ of the form:

$$
\lambda(\mathbf{x}) = \frac{
    \sup_{\theta \in \Theta_0} \mathcal{L}(\theta | \mathbf{x})
}{
    \sup_{\theta \in \Theta} \mathcal{L}(\theta | \mathbf{x})
}
$$

Here, $\mathcal{L}$ signifies the [likelihood
function](https://en.wikipedia.org/wiki/Likelihood_function). LRTs have a
rejection region $R \subset \mathcal{X}$ of the form: $R = \{\mathbf{x}:
\lambda(\mathbf{x}) \leq c\}$ with $c$ some constant.

> What is the constant $c$ in the definition of the rejection region? What does
> it mean, and how do we pick it? Good questions- we will come back to this in
> a [later step below](#4-pick-a-size-for-your-test) where we pick the desired
> “size” of our test.

The basic intuition of the LRT is that you are comparing how likely your data
$\mathbf{x}$ would be if $\theta$ had to be inside $\Theta_0$, versus if
$\theta$ were allowed to be anything it wanted. If $\Theta_0$ contains areas of
parameter space that could very well explain $\mathbf{x}$, then the numerator
will be almost or exactly as big as the denominator. This means $\lambda$ will
be relatively large and you won’t be able to reject $H_0$. In contrast, let’s
say that no $\theta$ in $\Theta_0$ is very likely to produce $\mathbf{x}$. Then
$\lambda$ might get quite small, and if it is small enough
($\lambda(\mathbf{x}) \leq c$) you can reject $H_0$.

## 3. Apply the framework to the problem at hand

Now that we know what the LRT is, and have built some intuition around it, we
need to apply it to our problem. Our mystery distribution $f$ takes the form of
a univariate normal with mean $\theta$. So in our case, what is
$\mathcal{L}(\theta | \mathbf{x})$?

Well, in general we know that $\mathcal{L}(\theta | \mathbf{x}) = \prod_{x \in
\mathbf{x}}{ f(x | \theta) }$. Thus, in our case (remember that $\mathbf{x}$ is
a set of $n$ samples):

$$
\begin{aligned}
    \mathcal{L}(\theta | \mathbf{x}) &=
        \prod_{x \in \mathbf{x}}{
            \frac{1}{\hat{\sigma} \sqrt{2\pi}} e^{ -\frac{1}{2} \left( \frac{x - \theta}{ \hat{\sigma} } \right)^2}
        }\\
    &= \left(\frac{1}{\hat{\sigma} \sqrt{2\pi}} \right)^n e^{-\frac{1}{2\hat{\sigma}^2}\sum_{x \in \mathbf{x}}(x - \theta)^2}
\end{aligned}
$$

So now we can express $\mathcal{L}(\theta | \mathbf{x})$. We next need to
figure out what $\sup_{\theta \in \Theta_0}\mathcal{L}(\theta | \mathbf{x})$
and $\sup_{\theta \in \Theta}\mathcal{L}(\theta | \mathbf{x})$ are. In our
case, the numerator $\sup_{\theta \in \Theta_0}\mathcal{L}(\theta |
\mathbf{x})$ of $\lambda$ is trivial, since $\Theta_0 = \{0\}$ and thus
$\sup_{\theta \in \Theta_0}\mathcal{L}(\theta | \mathbf{x}) =
\mathcal{L}(0|\mathbf{x})$.

For $\sup_{\theta \in \Theta}\mathcal{L}(\theta | \mathbf{x})$, we need to do a
bit of optimisation work as shown below, since $\Theta$ is not a singleton set.
For a bit of terminology, the $\theta$ we are looking for here where the
likelihood function is maximised, is called the [maximum likelihood
estimate](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation) (MLE) of
$\theta$ given $\mathbf{x}$.

To work out the MLE of $\theta$ for a univariate normal, we can set $\frac{d}{d\theta}\mathcal{L(\theta|\mathbf{x})} = 0$.

$$
\frac{d}{d\theta} \mathcal{L}(\theta | \mathbf{x}) =
    \frac{\mathcal{L}(\theta | \mathbf{x})}{\hat{\sigma}^2} \sum_{x \in \mathbf{x}}(x - \theta)
$$

Since $\frac{\mathcal{L}(\theta | \mathbf{x})}{\hat{\sigma}^2}$ can never equal zero,

$$
\begin{aligned}
    \frac{d}{d\theta} \mathcal{L}(\theta | \mathbf{x}) = 0
    &\iff \sum_{x \in \mathbf{x}}(x - \theta) = 0\\
    &\iff \theta = \frac{1}{n}\sum_{x \in \mathbf{x}}x = \bar{x}
\end{aligned}
$$

As such the MLE for $\theta$ here is the arithmetic average over $\mathbf{x}$,
denoted here as $\bar{x}$. Therefore, $\sup_{\theta \in
\Theta}\mathcal{L}(\theta | \mathbf{x}) = \mathcal{L}(\bar{x} | \mathbf{x})$.

Putting all of this together, you get:

$$
\begin{aligned}
    \lambda(\mathbf{x})
    &= \frac{\mathcal{L}(0 | \mathbf{x})}{\mathcal{L}(\bar{x} | \mathbf{x})}\\
    &= \exp\left[{\frac{1}{2\hat{\sigma}^2}\left(\sum_{x \in \mathbf{x}}(x-\bar{x})^2 - \sum_{x \in \mathbf{x}}x^2\right)}\right]\\
    &= \exp\left[{\frac{1}{2\hat{\sigma}^2}\left(-2\bar{x}\sum_{x \in \mathbf{x}}x + \sum_{x \in \mathbf{x}}\bar{x}^2 \right)}\right]\\
    &= \exp\left[\frac{-n\bar{x}^2}{2\hat{\sigma}^2}\right]\\
\end{aligned}
$$

We can now identify the rejection region $R$ within our sample space $\mathcal{X}$ as:

$$
\begin{aligned}
    R
    &= \{\mathbf{x}: \lambda(\mathbf{x}) \leq c\}\\
    &= \left\{\mathbf{x}: \exp\left[\frac{-n\bar{x}^2}{2\hat{\sigma}^2}\right] \leq c\right\}\\
    &= \left\{\mathbf{x}: |\bar{x}| \geq \sqrt{\frac{-2\hat{\sigma}^2\log{c}}{n}}\right\}
\end{aligned}
$$

## 4. Pick a size for your test

Where are we now? Well, we have a well-defined test statistic $\lambda$ that in
our case partitioned the sample space into rejection region $R$ and its
complement. But you might notice that the exact boundaries of our rejection
region still depends on a variable that we so far have not yet set explicitly:
$c$. Earlier I promised that we would discuss what $c$ means and how we pick
it. We will do so here.

In statistics, a useful way to categorise the calibre of hypothesis tests is by
reporting its "size", or sometimes "level". The intuition behind the meaning of
a test with size $\alpha$ is a test where, if $H_0$ were true (the value of
$\theta$ were to lie inside of $\Theta_0$), the maximum probability of a [type
1 error](https://en.wikipedia.org/wiki/Type_I_and_type_II_errors) (wrongly
rejecting the null hypothesis) is $\alpha$.

What is meant by the "maximum probability"? Well, remember that $\Theta_0$ can
contain many different possible values for $\theta$. Some values of $\theta$
within $\Theta_0$ may produce distributions that look nothing like ones that
could arise if $\theta \in \Theta_0^c$. If the true $\theta$ were to be such a
value, then there is a good chance that the data also looks decisively
"null-like". In situations like that, the probability of wrongly rejecting
$H_0$ should be very small. Now imagine picking a $\theta$ out of $\Theta_0$
such that you pick the $\theta$ that most closely resembles a $\theta$ outside
of $\Theta_0$. Maybe this $\theta$ sits right on the boundary between
$\Theta_0$ and $\Theta_0^c$. If this was the true value for $\theta$, then
unless you have a lot of data, the evidence might sometimes accidentally look
like it comes from a distribution with $\theta \in \Theta_0^c$, simply due to
chance. Therefore, the probability of a type 1 error should be higher. In a
size $\alpha$ test, the probability of a type 1 error in the _worst case
scenario_- where the true $\theta \in \Theta_0$ is the one that most looks like
a non-null $\theta$ - is equal to $\alpha$. That's what I meant by the "maximum
probability" of a type 1 error.

> The more succinct and technical definition would be that a hypothesis test of
> size $\alpha$ is a hypothesis test whose [power
> function](<https://en.wikipedia.org/wiki/Power_(statistics)>) has a maximum
> value of $\alpha$ when evaluated within $\Theta_0$.

If you have worked in biology or medicine, you often hear about data showing
"statistical significance" with a "$p$ value less than 0.05". You may also
remember being taught the meaning of a $p$ value being less than 0.05. That is,
if there is no real signal (e.g. no real difference between two groups of
data), then the probability of seeing a signal as large as what the data shows
is less than 0.05. Well, now that you've been introduced to some statistics
jargon, you can equivalently say that such hypothesis tests have a size or
level ($\alpha$) of 0.05. Another way of thinking about this is that $\alpha$
is basically a threshold such that if the $p$ value is less than $\alpha$, you
reject the null hypothesis.

With this in mind, let's say that we want our hypothesis test to be of size
0.05. That is, a maximum type 1 error probability of 5%. We can calibrate our
$c$ threshold such that if $\theta \in \Theta_0$, the maximum probability that
the data $\mathbf{x} \in R$ is 5%.

In our case, $\Theta_0$ only contains 0, so there is no need to do any
optimisation.

$$
\begin{aligned}
    \sup_{\theta \in \Theta_0}P(\mathbf{x} \in R | \theta)
    &= P_{\theta=0}(\mathbf{x} \in R)\\
    &= P_{\theta = 0}\left( |\bar{x}| \geq \sqrt{\frac{-2\hat{\sigma}^2\log{c}}{n}} \right)\\
    &= P_{\theta = 0}\left( \frac{\sqrt{n}}{\hat{\sigma}}|\bar{x}| \geq \sqrt{-2\log{c}} \right)
\end{aligned}
$$

Since $\frac{\sqrt{n}}{\hat{\sigma}}|\bar{x} - \theta| \sim \mathcal{N}(0,1)$, and
$\theta = 0$:

$$P_{\theta = 0}\left( \frac{\sqrt{n}}{\hat{\sigma}}|\bar{x}| \geq \sqrt{-2\log{c}} \right) = 2 \times P(Z \geq \sqrt{-2\log{c}})$$

Where $Z \sim \mathcal{N}(0,1)$. Now we want this probability to be 0.05, or
$\frac{1}{20}$. Let $z_{\alpha}$ denote the critical point such that $P(Z \geq
z_{\alpha}) = \alpha$. Then:

$$
\begin{aligned}
    2 \times P(Z \geq \sqrt{-2\log{c}}) &= \frac{1}{20}\\
    \iff P(Z \geq \sqrt{-2\log{c}}) &= \frac{1}{40}\\
    \iff \sqrt{-2\log{c}} &= z_{\frac{1}{40}}\\
    \iff c &= \exp\left(-z_{\frac{1}{40}}^2 / 2\right) \approx 0.146
\end{aligned}
$$

Et voila! We now have our threshold $c$, calibrated so that our test is of size 0.05.
Armed with this $c$, all you have left to do is to check whether the following is true:

$$|\bar{x}| \geq \sqrt{\frac{-2\hat{\sigma}^2\log{c}}{n}}$$

If yes, then according to our test design and assumptions, you can reject
$H_0$. If not, then you should accept $H_0$.
