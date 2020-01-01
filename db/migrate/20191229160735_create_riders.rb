class CreateRiders < ActiveRecord::Migration[6.0]
  def change
    create_table :riders do |t|

      t.string :first_name
      t.string :last_name
      t.string :city
      t.string :state
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
