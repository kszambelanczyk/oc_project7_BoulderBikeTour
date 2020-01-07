require 'test_helper'

class SloganTest < ActiveSupport::TestCase

  test 'valid slogan model' do
    slogan = Slogan.new(first_name: 'John', last_name: 'Black', email: 'john@example.com', slogan: 'test slogan')
    assert slogan.valid?
  end

  test 'invalid without frist_name' do
    slogan = Slogan.new(last_name: 'Black', email: 'john@example.com', slogan: 'test slogan')
    assert_not slogan.valid?, 'slogan is valid without a first_name'
    assert_not_nil slogan.errors[:name], 'no validation error for no first_name present'
  end

  test 'invalid without last_name' do
    slogan = Slogan.new(first_name: 'Black', email: 'john@example.com', slogan: 'test slogan')
    assert_not slogan.valid?, 'slogan is valid without a last_name'
    assert_not_nil slogan.errors[:name], 'no validation error for no last_name present'
  end

  test 'invalid without email' do
    slogan = Slogan.new(first_name: 'John', last_name: 'Black', slogan: 'test slogan')
    assert_not slogan.valid?, 'slogan is valid without a email'
    assert_not_nil slogan.errors[:email], 'no validation error for no email present'
  end

  test 'invalid not valid email' do
    slogan = Slogan.new(first_name: 'John', last_name: 'Black', email: 'johnexample.com',  slogan: 'test slogan')
    assert_not slogan.valid?, 'slogan is valid with invalid email'
    assert_not_nil slogan.errors[:email], 'no validation error for invalid email present'
  end

  test 'invalid without slogan' do
    slogan = Slogan.new(first_name: 'John', last_name: 'Black', email: 'john@example.com')
    assert_not slogan.valid?, 'slogan is valid without a slogan property'
    assert_not_nil slogan.errors[:name], 'no validation error for no slogan present'
  end

  test 'invalid with slogan property to long' do
    slogan = Slogan.new(first_name: 'John', last_name: 'Black', email: 'john@example.com',  slogan: 
      'test slogan very long line,  very long line, very long line, 
      very long line, very long line, very long line, very long line, 
      very long line, very long line, very long line, very long line, 
      very long line, very long line, very long line, very long line')
    assert_not slogan.valid?, 'slogan is valid with slogan property over 50 characters'
    assert_not_nil slogan.errors[:name], 'no validation error for no slogan property over 50 characters present'
  end


end
