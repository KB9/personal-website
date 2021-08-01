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
