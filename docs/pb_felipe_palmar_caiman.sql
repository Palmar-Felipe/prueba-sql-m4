


CREATE DATABASE ExpertSoft;
USE ExpertSoft;

CREATE TABLE users (
    id_user INT  PRIMARY KEY AUTO_INCREMENT,
    namei VARCHAR(50) NOT NULL,
	dni VARCHAR(100)NOT NULL,
    address VARCHAR(100)NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100)NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);





CREATE TABLE transactions(
id_transaction VARCHAR(50) PRIMARY KEY , 
id_user INT NOT NULL,
id_billings INT NOT NULL,
Date_and_Time_Transaction DATETIME NOT NULL,
Amount VARCHAR(100) NOT NULL, 	
State ENUM('pendiente','Completada','Fallida'),
Transaction_Type VARCHAR(50) NOT NULL,
foreign key (id_user) references users (id_user),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 );  
 
 CREATE TABLE billings(
id_billing INT  PRIMARY KEY,
id_transaction VARCHAR(50) NOT NULL,
id_user INT NOT NULL,
Used_Platform ENUM('nequi', 'daviplata') NOT NULL,
Invoice_Number VARCHAR(50) NOT NULL,
Billing_Period VARCHAR(50) NOT NULL,
Billed_Amount INT NOT NULL,
Amount_Paid INT NOT NULL,
FOREIGN KEY (id_user) REFERENCES users (id_user),
FOREIGN KEY (id_transaction) REFERENCES transactions (id_transaction),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);

select * from users;
select * from billings