#!/usr/bin/env python3
# Pure Python linear regression demo for beginners

DATA = [
    {"area": 40, "price": 1.2},
    {"area": 55, "price": 1.8},
    {"area": 70, "price": 2.4},
    {"area": 85, "price": 3.0},
    {"area": 100, "price": 3.7},
    {"area": 120, "price": 4.5},
]


def train_linear(data):
    xs = [row["area"] for row in data]
    ys = [row["price"] for row in data]
    x_mean = sum(xs) / len(xs)
    y_mean = sum(ys) / len(ys)
    numerator = sum((x - x_mean) * (y - y_mean) for x, y in zip(xs, ys))
    denominator = sum((x - x_mean) ** 2 for x in xs)
    slope = numerator / denominator
    intercept = y_mean - slope * x_mean
    return slope, intercept


def predict(area, slope, intercept):
    return slope * area + intercept


def mae(test, slope, intercept):
    errors = [abs(row["price"] - predict(row["area"], slope, intercept)) for row in test]
    return sum(errors) / len(errors)


def main():
    train = DATA[:4]
    test = DATA[4:]
    slope, intercept = train_linear(train)
    print("ML Predictor Demo")
    print("Model: price =", round(slope, 4), "* area +", round(intercept, 4))
    print("MAE on test:", round(mae(test, slope, intercept), 3), "tỷ")
    new_area = 90
    print(f"Prediction for {new_area}m2:", round(predict(new_area, slope, intercept), 2), "tỷ")
    print("Limitation: dữ liệu quá ít, chỉ dùng để học train/test và metric.")


if __name__ == "__main__":
    main()
