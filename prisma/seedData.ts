export const userData = {
  firstname: "Test",
  lastname: "Bruger",
  email: "test@example.com",
  password: "password",
  role: "USER",
  isActive: true
};

export const fueltypesData = [
  { name: "Benzin" },
  { name: "Diesel" },
  { name: "El" },
  { name: "Hybrid" },
  { name: "Andre" }
];

export const categoriesData = [
  { name: "Personbil" },
  { name: "Varevogn" },
  { name: "Lastbil" },
  { name: "Autocamper" },
  { name: "Andre" }
];

export const brandsData = [
  { name: "Volvo",    logo: "volvo.png" },
  { name: "BMW",      logo: "bmw.png" },
  { name: "Ford",     logo: "ford.png" },
  { name: "Toyota",   logo: "toyota.png" },
  { name: "Mercedes", logo: "mercedes.png" }
];

export const carsData = [
  { brand: "Volvo",    category: "Personbil",  model: "XC60",    year: 2022, price: 450000,  fueltype: "Hybrid" },
  { brand: "Volvo",    category: "Personbil",  model: "V60",     year: 2021, price: 380000,  fueltype: "Diesel" },
  { brand: "BMW",      category: "Personbil",  model: "X5",      year: 2023, price: 850000,  fueltype: "Benzin" },
  { brand: "BMW",      category: "Personbil",  model: "i4",      year: 2024, price: 620000,  fueltype: "El" },
  { brand: "Ford",     category: "Varevogn",   model: "Transit", year: 2020, price: 290000,  fueltype: "Diesel" },
  { brand: "Ford",     category: "Personbil",  model: "Focus",   year: 2019, price: 145000,  fueltype: "Benzin" },
  { brand: "Toyota",   category: "Personbil",  model: "Corolla", year: 2022, price: 220000,  fueltype: "Hybrid" },
  { brand: "Toyota",   category: "Autocamper", model: "Hiace",   year: 2018, price: 310000,  fueltype: "Diesel" },
  { brand: "Mercedes", category: "Lastbil",    model: "Actros",  year: 2021, price: 1200000, fueltype: "Diesel" },
  { brand: "Mercedes", category: "Andre",      model: "EQS",     year: 2024, price: 1050000, fueltype: "El" }
];