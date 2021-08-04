## The Discrete Fourier Transform (DFT)

The DFT is defined as:

$$
X(k) = \sum_{t=0}^{n-1} x(t) e^{-2 \pi i t k / n}
$$

Skeleton code:

```cpp
void dft(double *in_real, double *in_imag, double *out_real, double *out_imag,
         size_t n) {
  for (size_t k = 0; k < n; ++k) {
    // out_real[k] = ?;
    // out_imag[k] = ?;
  }
}
```

Euler's formula says $e^{xi} = cosx + isinx$. Therefore:

$$
e^{-2 \pi i t k / n} = e^{(-2 \pi t k / n)i} = cos\left(\frac{-2 \pi t k}{n}\right) + isin\left(\frac{-2 \pi t k}{n}\right)
$$

Given that $cos(-x) = cosx$ and $sin(-x) = -sinx$, by substitution:

$$
e^{-2 \pi i t k / n} = cos\left(\frac{2 \pi t k}{n}\right) - isin\left(\frac{2 \pi t k}{n}\right)
$$

Let $Re(x)$ and $Im(x)$ represent the real and imaginary parts of $x$
respectively. By definition, $x = Re(x) + iIm(x)$. Therefore:

$$
x(t) e^{-2 \pi i t k / n} = \left[ Re(x(t)) + iIm(x(t)) \right] \left[ cos\left(\frac{2 \pi t k}{n}\right) - isin\left(\frac{2 \pi t k}{n}\right) \right]
$$

We can use the distributive law and the identity $i^2 = -1$ to multiply complex
numbers:

$$
(a + bi)(c + di) = ac + adi + bci - bd = (ac - bd) + (ad + bc)i
$$

This gives us:

$$
x(t) e^{-2 \pi i t k / n} = \left[ Re(x(t))cos\left(\frac{2 \pi t k}{n}\right) + Im(x(t))sin\left(\frac{2 \pi t k}{n}\right) \right] + i\left[ -Re(x(t))sin\left(\frac{2 \pi t k}{n}\right) + Im(x(t))cos\left(\frac{2 \pi t k}{n}\right) \right]
$$

```cpp
void dft(double *in_real, double *in_imag, double *out_real, double *out_imag, size_t n) {
  for (size_t k = 0; k < n; ++k) {
    double sum_real = 0.0;
    double sum_imag = 0.0;
    for (size_t t = 0; t < n; ++t) {
      double angle = 2.0 * std::numbers::pi_v<double> * t * k / n;
      sum_real += in_real[t] * std::cos(angle) + in_imag[t] * std::sin(angle);
      sum_imag += -in_real[t] * std::sin(angle) + in_imag[t] * std::cos(angle);
    }
    out_real[k] = sum_real;
    out_imag[k] = sum_imag;
  }
}
```

## The Fast Fourier Transform (FFT)

- DFT above is $O(n^2)$.
- FFT reduces complexity to $O(n log n)$.

## The Cooley-Tukey FFT Algorithm

- Re-expresses the DFT of an arbitraty composite size $N=N_1N_2$ in terms of $N_1$ smaller DFTs of sizes $N_2$.

We split the DFT over even-numbered indices $n=2m$ and odd-numbered indices
$n=2m+1$ and add these summations together:

$$
X_k = \sum_{m=0}^{n/2-1} x_{2m}e^{\frac{-2 \pi i}{n} (2m) k} + \sum_{m=0}^{n/2-1} x_{2m+1}e^{\frac{-2 \pi i}{n} (2m+1) k}
$$

We begin by expanding the exponent of the second $e$ to reveal a constant
exponent:

$$
\frac{-2 \pi i}{n} (2m+1) k = \frac{-2 \pi i}{n}(2m)k + \frac{-2 \pi i}{n}k
$$

Substituting this expansion back into the original equation, we get:

$$
X_k = \sum_{m=0}^{n/2-1} x_{2m}e^{\frac{-2 \pi i}{n} (2m) k} + \sum_{m=0}^{n/2-1} x_{2m+1}e^{\frac{-2 \pi i}{n}(2m)k + \frac{-2 \pi i}{n}k}
$$

Since $a^{x + y} = a^{x}a^{y}$ and $\sum ax = a\sum x$, we can factor out
the constant multiplier from the second summation:

$$
X_k = \sum_{m=0}^{n/2-1} x_{2m}e^{\frac{-2 \pi i}{n} (2m) k} + e^{\frac{-2 \pi i}{n}k} \sum_{m=0}^{n/2-1} x_{2m+1}e^{\frac{-2 \pi i}{n}(2m)k}
$$

Simplifying the exponents:

$$
X_k = \sum_{m=0}^{n/2-1} x_{2m}e^{\frac{-2 \pi i}{n/2}mk} + e^{\frac{-2 \pi i}{n}k} \sum_{m=0}^{n/2-1} x_{2m+1}e^{\frac{-2 \pi i}{n/2}mk}
$$

This reveals that **the two summations are simply the DFT of the even-indexed
part $x_{2m}$ and the DFT of the odd-indexed part $x_{2m+1}$**. If we denote
the even-indexed DFT as $E_k$ and the odd-indexed DFT as $O_k$:

$$
E_k = \sum_{m=0}^{n/2-1} x_{2m}e^{\frac{-2 \pi i}{n/2}mk},\qquad O_k = \sum_{m=0}^{n/2-1} x_{2m+1}e^{\frac{-2 \pi i}{n/2}mk}
$$

We get the (much more readable) equation:

$$
X_k = E_k + e^{\frac{-2 \pi i}{n}k} O_k
$$

$E_k$ and $O_k$ are both DFTs and, as such, can only produce a sequence of
outputs equal in length to their inputs. Since the upper limit of $E_k$ and
$O_k$ is $\frac{n}{2}$, it means that this equation cannot be used to find
$X_k$ values where $k\ge\frac{n}{2}$.

TODO: Explain why we look for $X_{k+\frac{n}{2}}$

$$
X_{k+\frac{n}{2}} = \sum_{m=0}^{n/2-1} x_{2m}e^{\frac{-2 \pi i}{n/2}m(k + \frac{n}{2})} + e^{\frac{-2 \pi i}{n}(k + \frac{n}{2})} \sum_{m=0}^{n/2-1} x_{2m+1}e^{\frac{-2 \pi i}{n/2}m(k + \frac{n}{2})}
$$

$$
X_{k+\frac{n}{2}} = \sum_{m=0}^{n/2-1} x_{2m}e^{\frac{-2 \pi i}{n/2}mk} e^{-2\pi mi} + e^{\frac{-2 \pi i}{n}k} e^{-\pi i} \sum_{m=0}^{n/2-1} x_{2m+1}e^{\frac{-2 \pi i}{n/2}mk} e^{-2\pi mi}
$$

We can use [Euler's identity](https://en.wikipedia.org/wiki/Euler%27s_identity)
to simplify this equation dramatically. We can simplify $e^{-\pi i}=-1$ and
$e^{-2\pi mi}=1$ (it doesn't matter what $m$ is, any exponent with a factor of
$-2\pi i$ will always result in $1$). This produces:

$$
X_{k+\frac{n}{2}} = \sum_{m=0}^{n/2-1} x_{2m}e^{\frac{-2 \pi i}{n/2}mk} - e^{\frac{-2 \pi i}{n}k} \sum_{m=0}^{n/2-1} x_{2m+1}e^{\frac{-2 \pi i}{n/2}mk}
$$

Oh, look! $E_k$ and $O_k$ are back again:

$$
X_{k+\frac{n}{2}} = E_k - e^{\frac{-2 \pi i}{n}k} O_k
$$

We can then write $X_k$ as:

$$
X_k = E_k + e^{\frac{-2 \pi i}{n}k} O_k
$$

$$
X_{k+\frac{n}{2}} = E_k - e^{\frac{-2 \pi i}{n}k} O_k
$$

Iterative:

```cpp
void fft(std::vector<complex_t> &data, size_t N) {
  if (N <= 1) return;

  std::vector<complex_t> even(N / 2);
  std::vector<complex_t> odd(N / 2);
  for (size_t i = 0; i < N / 2; ++i) {
    even[i] = data[i * 2];
    odd[i] = data[i * 2 + 1];
  }

  fft(even, N / 2);
  fft(odd, N / 2);

  for (size_t k = 0; k < N / 2; ++k) {
    complex_t t = std::exp(complex_t(0, -2 * std::numbers::pi_v<real_t> * k / N)) * odd[k];
    data[k] = even[k] + t;
    data[N / 2 + k] = even[k] - t;
  }
}
```
