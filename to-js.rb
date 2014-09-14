class Regexp
  def as_json(options = nil)
    Regexp.new inspect.sub('\\A','^').sub('\\Z','$').sub('\\z','$').sub(/^\//,'').sub(/\/[a-z]*$/,'').gsub(/\(\?#.+\)/, '').gsub(/\(\?-\w+:/,'(').gsub(/\s/,''), self.options & 5
  end

  def to_json(options = nil)
    as_json(options).inspect
  end

  def encode_json(encoder)
    inspect
  end
end

 LINE = /
      \A
      (?:export\s+)?
      ([\w\.]+)
      (?:\s*=\s*|:\s+?)
      (
        '(?:\'|[^'])*'
        |
        "(?:\"|[^"])*"
        |
        [^#\n]+
      )?
      (?:\s*\#.*)?
      \z
    /x


other = /\\([^$])/

VARIABLE = /
          (\\)?
          (\$)
          (
            \{?
            ([A-Z0-9_]+)
            \}?
          )
        /xi

unescape = /\\([^$])/

puts unescape.to_json
