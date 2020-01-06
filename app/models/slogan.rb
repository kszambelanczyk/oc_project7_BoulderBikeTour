class Slogan < ApplicationRecord

    validates :first_name, presence: { message: "Please fill up first name"}, length: { minimum: 2, message: "First name to short" }
    validates :last_name, presence: { message: "Please fill up last name"}, length: { minimum: 2, message: "Last name to short" }
    validates :email, presence: { message: "Please fill up email"}, email: { message: "Not a valid email"}
    validates :slogan, length: { in: 3..50, message: "Slogan should be between 3 to 50 characters" }
    
end
