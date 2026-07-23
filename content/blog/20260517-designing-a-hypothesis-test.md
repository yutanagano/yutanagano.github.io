+++
title = 'How do you design a hypothesis test?'
date = 2026-05-17T11:25:41+09:00
draft = false
+++

Let data points $\mathbf{x} = \{x_i\}_{i=1}^n, \mathbf{x} \in \mathcal{X}$ be a sample from a distribution $f$ with unknown parameter $\theta$.
Here $\mathcal{X}$ is the space of all possible sets of $n$ samples.
Suppose that $f$ is a member of the family of distributions $\mathcal{F} = \{f_{\theta}: \theta \in \Theta\}$.
We have a null hypothesis $H_0$ that $\theta \in \Theta_0$, where $\Theta_0 \subset \Theta$ is some region of the parameter space.
Conversely, we have an alternative hypothesis $H_1$ that $\theta \notin \Theta_0$, or $\theta \in \Theta_0^c$, where $\Theta_0^c$ is the complement of $\Theta_0$ and represents perhaps some more interesting region of the parameter space.
How can we test our belief on whether the true $\theta$ lies inside $\Theta_0$ or $\Theta_0^c$?

To illustrate some simple example, let’s assume that $\mathcal{F}$ is the univariate normal family with known variance $\sigma^2$ so that: $$f_{\theta} = \frac{1}{\sigma \sqrt{2\pi}} e^{ -\frac{1}{2} \left( \frac{x-\theta}{\sigma} \right)^2 }$$

Basically, our mystery distribution $f$ has mean $\theta$ and we want to find out where we think $\theta$ lies.

Let’s say that our null hypothesis is that $\theta = 0$.
This means that $\Theta = \mathbb{R}$, $\Theta_0 = \{0\}$ and $\Theta_0^c = \{\theta: \theta \in \mathbb{R}, \theta \not = 0\}$.

## 1. Pick a hypothesis testing framework

To design a hypothesis test, we need a system where we can use the available data to compute some statistic, then depending on the value of the statistic, either reject or accept $H_0$.
There are many strategies/frameworks with which one can come up with a test statistic, but for this example let’s use the very common and useful [[likelihood ratio test]] (LRT).
The LRT involves a test statistic $\lambda$ of the form: $$\lambda(\mathbf{x}) = \frac{\sup_{\theta \in \Theta_0} \mathcal{L}(\theta | \mathbf{x})}{\sup_{\theta \in \Theta} \mathcal{L}(\theta | \mathbf{x})}$$ where $\mathcal{L}$ signifies the [[likelihood function]].
LRTs have a rejection region $R \subset \mathcal{X}$ of the form: $R = \{\mathbf{x}: \lambda(\mathbf{x}) \leq c\}$ with $c$ some constant.

> What is the constant $c$ in the definition of the rejection region?
> What does it mean, and how do we pick it?
> Good questions- we will come back to this in a later step below where we pick the desired “size” of our test.

The basic intuition of the LRT is that you are comparing how likely your data $\mathbf{x}$ would be if $\theta$ had to be inside $\Theta_0$, versus if $\theta$ were allowed to be anything it wanted.
If $\Theta_0$ contains areas of parameter space that could very well explain $\mathbf{x}$, then the numerator will be almost or exactly as big as the denominator.
This means $\lambda$ will be relatively large and you won’t be able to reject $H_0$.
In contrast, let’s say that no $\theta$ in $\Theta_0$ is very likely to produce $\mathbf{x}$.
Then $\lambda$ might get quite small, and if it is small enough ($\lambda(\mathbf{x}) \leq c$) you can reject $H_0$.

## 2. Apply the framework to the problem at hand

Okay great, so we now know what the LRT is and its intuition.
Now we need to apply it to our problem.
Our mystery distribution $f_\theta$ takes the form of a univariate normal with mean $\theta$.
So in our case, what is $\mathcal{L}(\theta | \mathbf{x})$?

Well, in general we know that $\mathcal{L}(\theta | \mathbf{x}) = \prod_{x \in \mathbf{x}}{ f(x | \theta) }$.
Thus, in our case (remember that $\mathbf{x}$ is a set of $n$ samples): $$\begin{aligned} \mathcal{L}(\theta | \mathbf{x}) &= \prod_{x \in \mathbf{x}}{ \frac{1}{\sigma \sqrt{2\pi}} e^{ -\frac{1}{2} \left( \frac{x - \theta}{ \sigma } \right)^2} }\\ &= \left(\frac{1}{\sigma \sqrt{2\pi}} \right)^n e^{-\frac{1}{2\sigma^2}\sum_{x \in \mathbf{x}}(x - \theta)^2} \end{aligned}$$

So now we can express $\mathcal{L}(\theta | \mathbf{x})$.
We next need to figure out what $\sup_{\theta \in \Theta_0}\mathcal{L}(\theta | \mathbf{x})$ and $\sup_{\theta \in \Theta}\mathcal{L}(\theta | \mathbf{x})$ are.
In our case, the numerator $\sup_{\theta \in \Theta_0}\mathcal{L}(\theta | \mathbf{x})$ of $\lambda$ is trivial, since $\Theta_0 = \{0\}$ and thus $\sup_{\theta \in \Theta_0}\mathcal{L}(\theta | \mathbf{x}) = \mathcal{L}(0|\mathbf{x})$.
What about $\sup_{\theta \in \Theta}\mathcal{L}(\theta | \mathbf{x})$?
Well, if you think about it, that turns out to be $\mathcal{L}$ evaluated at the [[maximum likelihood estimate]] (MLE) of $\theta$ given $\mathbf{x}$.

To work out the MLE of $\theta$ for a univariate normal, we can set $\frac{d}{d\theta}\mathcal{L(\theta|\mathbf{x})} = 0$.
$$\frac{d}{d\theta} \mathcal{L}(\theta | \mathbf{x}) = \frac{\mathcal{L}(\theta | \mathbf{x})}{\sigma^2} \sum_{x \in \mathbf{x}}(x - \theta)$$ and since $\frac{\mathcal{L}(\theta | \mathbf{x})}{\sigma^2}$ can never equal zero, $$\frac{d}{d\theta} \mathcal{L}(\theta | \mathbf{x}) = 0 \iff \sum_{x \in \mathbf{x}}(x - \theta) = 0 \iff \theta = \frac{1}{n}\sum_{x \in \mathbf{x}}x = \bar{x}$$
As such the MLE for $\theta$ here is the arithmetic average over $\mathbf{x}$, denoted here as $\bar{x}$.
Therefore, $\sup_{\theta \in \Theta}\mathcal{L}(\theta | \mathbf{x}) = \mathcal{L}(\bar{x} | \mathbf{x})$.

Putting all of this together, you get:

$$
\begin{aligned}
    \lambda(\mathbf{x})
    &= \frac{\mathcal{L}(0 | \mathbf{x})}{\mathcal{L}(\bar{x} | \mathbf{x})}\\
    &= \exp\left[{\frac{1}{2\sigma^2}\left(\sum_{x \in \mathbf{x}}(x-\bar{x})^2 - \sum_{x \in \mathbf{x}}x^2\right)}\right]\\
    &= \exp\left[\frac{-n\bar{x}^2}{2\sigma^2}\right]\\
\end{aligned}
$$

We can now identify the rejection region $R$ within our sample space $\mathcal{X}$ as:

$$
\begin{aligned}
    R
    &= \{\mathbf{x}: \lambda(\mathbf{x}) \leq c\}\\
    &= \left\{\mathbf{x}: \exp\left[\frac{-n\bar{x}^2}{2\sigma^2}\right] \leq c\right\}\\
    &= \left\{\mathbf{x}: |\bar{x}| \geq \sqrt{\frac{-2\sigma^2\log{c}}{n}}\right\}
\end{aligned}
$$

## 3. Pick a size for your test

Where are we now?
Well, we have a well-defined test statistic $\lambda$ that in our case partitioned the sample space into rejection region $R$ and its complement.
But you might notice that the exact boundaries of our rejection region still depends on a variable that we so far have not yet set explicitly: $c$.
Earlier I promised that we would discuss what $c$ means and how we pick it.
We will do so here.

In statistics, a useful way to categorise the calibre of hypothesis tests is by reporting its "size", or sometimes "level".
The intuition behind the meaning of a test with size $\alpha$ is a test where, if $H_0$ were true (the value of $\theta$ were to lie inside of $\Theta_0$), the maximum probability of a [[type 1 error]] is $\alpha$.

What is meant by the "maximum probability"?
Well, remember that $\Theta_0$ can contain many different possible values for $\theta$.
Some values of $\theta$ within $\Theta_0$ may produce distributions that look nothing like ones that could arise if $\theta \in \Theta_0^c$.
If the true $\theta$ were to be such a value, then there is a good chance that the data also look decisively "null-like".
In situations like that, the probability of wrongly rejecting $H_0$ should be very small.
Now imagine picking a $\theta$ out of $\Theta_0$ such that you pick the $\theta$ that most closely resembles a $\theta$ outside of $\Theta_0$.
Maybe this $\theta$ sits right on the boundary between $\Theta_0$ and $\Theta_0^c$.
If this was the true value for $\theta$, then unless you have a lot of data, the evidence might sometimes accidentally look like it comes from a distribution with $\theta \in \Theta_0^c$, simply due to chance.
Therefore, the probability of a type 1 error should be higher.
In a size $\alpha$ test, the probability of a type 1 error in the _worst case scenario_- where the true $\theta \in \Theta_0$ is the one that most looks like a non-null $\theta$ - is equal to $\alpha$.
That's what I meant by the "maximum probability" of a type 1 error.

> The more succinct and technical definition would be that a hypothesis test of size $\alpha$ is a hypothesis test whose [[power function]] has a maximum value of $\alpha$ when evaluated within $\Theta_0$.

With this in mind, let's say that we want our hypothesis test to be of size 0.05.
That is, a maximum type 1 error probability of 5%.
We can calibrate our $c$ threshold such that if $\theta \in \Theta_0$, the maximum probability that the data $\mathbf{x} \in R$ is 5%.

In our case, $\Theta_0$ only contains 0, so there is no need to do any optimisation.

$$
\begin{aligned}
    \sup_{\theta \in \Theta_0}P(\mathbf{x} \in R | \theta)
    &= P_{\theta=0}(\mathbf{x} \in R)\\
    &= P_{\theta = 0}\left( |\bar{x}| \geq \sqrt{\frac{-2\sigma^2\log{c}}{n}} \right)\\
    &= P_{\theta = 0}\left( \frac{\sqrt{n}}{\sigma}|\bar{x}| \geq \sqrt{-2\log{c}} \right)
\end{aligned}
$$

Since $\frac{\sqrt{n}}{\sigma}|\bar{x} - \theta| \sim \mathcal{N}(0,1)$ (see [[What is the distribution of a normal sample mean?]]), and $\theta = 0$:
$$P_{\theta = 0}\left( \frac{\sqrt{n}}{\sigma}|\bar{x}| \geq \sqrt{-2\log{c}} \right) = 2 \times P(Z \geq \sqrt{-2\log{c}})$$ where $Z \sim \mathcal{N}(0,1)$.
Now we want this probability to be 0.05, or $\frac{1}{20}$.
Let $z_{\alpha}$ denote the critical point such that $P(Z \geq z_{\alpha}) = \alpha$, $Z \sim \mathcal{N}(0,1)$.
Then:

$$
\begin{aligned}
    2 \times P(Z \geq \sqrt{-2\log{c}}) &= \frac{1}{20}\\
    \iff P(Z \geq \sqrt{-2\log{c}}) &= \frac{1}{40}\\
    \iff \sqrt{-2\log{c}} &= z_{\frac{1}{40}}\\
    \iff c &= \exp\left(-z_{\frac{1}{40}}^2 / 2\right) \approx 0.146
\end{aligned}
$$

Et voila! We now have our threshold $c$, calibrated so that our test is of size 0.05.
Armed with this $c$, all you have left to do is to check whether $$|\bar{x}| \geq \sqrt{\frac{-2\sigma^2\log{c}}{n}}$$ is true or not.
If yes, then according to our test design and assumptions, you can reject $H_0$.
If not, then you should accept $H_0$.
