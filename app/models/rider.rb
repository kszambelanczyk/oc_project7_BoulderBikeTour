class Rider < ApplicationRecord
  validates :first_name, presence: { message: "Please fill up first name"}, length: { minimum: 2, message: "First name to short" }
  validates :last_name, presence: { message: "Please fill up last name"}, length: { minimum: 2, message: "Last name to short" }

  validates :lat, presence: true
  validates :lng, presence: true
end
